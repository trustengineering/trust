/**
 *  eslint-env node, mocha
 */

import sinon from 'sinon';

import MockChannel from '../../../src/domain/channels/mock-channel';
import { expect } from '../../support/expect';
import { invalidMessage, validMessage } from '../../support/stubs';
import { Messenger, Message } from '../../../src/domain';

const nullChannel = {
  send: () => null
};

describe('A Messenger', () => {
  let messenger;

  beforeEach(() => {
    messenger = new Messenger(nullChannel);
  });

  it('should have record of a valid Message sent via a MockChannel', () => {
    const channel = new MockChannel();

    Messenger.send(new Message(validMessage), channel);

    expect(channel.messages[0]).to.deep.equal(validMessage);
  });

  it('should throw when it is created without a Channel', () => {
    expect(() => new Messenger()).to.throw('Invalid channel');
  });

  it('should receive a Message', () => {
    messenger.receive(new Message(validMessage));

    expect(messenger.readyToSend).to.equal(true);
  });

  it('should throw when it receives an invalid Message', () => {
    expect(() => messenger.receive(new Message(invalidMessage))).to.throw('Invalid message');
  });

  it('should send a message via the provided Channel', () => {
    const sendSpy = sinon.spy(nullChannel, 'send');

    messenger.receive(new Message(validMessage));
    messenger.send();

    expect(sendSpy.callCount).to.equal(1);
    sendSpy.restore();
  });
});
