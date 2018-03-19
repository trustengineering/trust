/* eslint-env node, mocha */

const { expect } = require('./support/expect');
const sinon = require('sinon');
const { invalidMessage, validMessage } = require('./support/stubs');

const { Messenger, Message } = require('../src/domain');

const nullChannel = {
  send: () => null
};

describe('A Messenger', () => {
  let messenger;

  beforeEach(() => {
    messenger = new Messenger(nullChannel);
  });

  it('should throw when it is created without a Channel', () => {
    expect(() => new Messenger()).to.throw('Invalid channel');
  });

  it('should receive a Message', () => {
    messenger.receive(new Message(validMessage));

    expect(messenger.readyToSend).to.equal(true);
  });

  it('should throw when it receives an invalid Message', () => {
    expect(() => messenger.receive(new Message(invalidMessage))).to.throw(
      'Invalid message');
  });

  it('should send a message via the provided Channel', () => {
    const sendSpy = sinon.spy(nullChannel, 'send');

    messenger.receive(new Message(validMessage));
    messenger.send();

    expect(sendSpy.callCount).to.equal(1);
    sendSpy.restore();
  });
});
