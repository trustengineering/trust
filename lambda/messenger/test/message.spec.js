/* eslint-env node, mocha */

const { expect } = require('./support/expect');
const sinon = require('sinon');
const { invalidMessage, validMessage } = require('./support/stubs');

const { Messenger, Message } = require('../src/domain');

const stubAdapter = {
  send: () => null
};

describe('A Messenger', () => {
  let messenger;

  beforeEach(() => {
    messenger = new Messenger(stubAdapter);
  });

  it('should throw when it is created without an adapter', () => {
    expect(() => Messenger()).to.throw('Invalid adapter');
  });

  it('should recieve a Message', () => {
    messenger.receive(new Message(validMessage));

    expect(messenger.readyToSend).to.equal(true);
  });

  it('should throw when it recieves an invalid message', () => {
    expect(() => messenger.receive(new Message(invalidMessage))).to.throw(
      'Invalid message request',
      Error
    );
  });

  it('should send a reponse for a valid request', () => {
    const sendSpy = sinon.spy(stubAdapter, 'send');

    messenger.receive(new Message(validMessage));
    messenger.send();

    expect(sendSpy.callCount).to.equal(1);
    sendSpy.restore();
  });
});
