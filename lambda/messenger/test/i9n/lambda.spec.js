import { expect } from '../support/expect';

import { messenger } from '../../src/lambda';
import { promisify } from 'es6-promisify'; // eslint-disable-line
import { messengerContainer } from '../../src/ioc/messenger-container';
import MockChannel from '../../src/domain/channels/mock-channel';

const lambda = promisify(messenger);

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
    messengerContainer.register('Channel', MockChannel);
  });

  it('should execute without crashing', () => {
    expect(() => lambda(event, {}).not.to.throw());
  });

  it('should return an ok status', () =>
    expect(lambda(event, {})).to.eventually.deep.equal({ status: 'ok' }));
});
