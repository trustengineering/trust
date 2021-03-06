import { expect } from '../support/expect';

import { messenger } from '../../src/lambda';
import { promisify } from 'es6-promisify'; // eslint-disable-line
import { messengerContext } from '../../src/ioc/messenger-context';
import MockChannel from '../../src/domain/channels/mock-channel';

const lambda = promisify(messenger);

const lambdaTestUtils = {
  createProxyLambdaIntegrationEvent: eventObject => {
    const eo = Object.assign({}, eventObject);
    eo.body = JSON.stringify(eo.body);

    return eo;
  }
};

describe('A Messenger Lambda', () => {
  const message = {
    subject: 'SUBJECT',
    body: 'BODY',
    sender: {
      name: 'Lambda test',
      email: 'lewis@email.com'
    }
  };

  const event = {
    body: message
  };

  before(() => {
    messengerContext.reRegister('Channel', MockChannel);
  });

  it('should execute without crashing', () =>
    expect(() =>
      lambda(lambdaTestUtils.createProxyLambdaIntegrationEvent(event), {}).not.to.throw()
    ));

  it('should return an ok status', () =>
    expect(
      lambda(lambdaTestUtils.createProxyLambdaIntegrationEvent(event), {})
    ).to.eventually.deep.equal({ status: 'ok' }));
});
