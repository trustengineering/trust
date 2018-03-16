/**
 * A Messenger recieves requests and sends messages based on the recieved requests
 *
 */

const validations = require('./validations');

function Messenger(messagingAdapter) {
  if (!validations.isDefined(messagingAdapter) || !validations.isAFunction(messagingAdapter.send)) {
    throw new Error(Messenger.Errors.InvalidAdapter);
  }

  this.messagingAdapter = messagingAdapter;
  this.readyToSend = false;

  Object.seal(this);
}

Messenger.Errors = {
  InvalidAdapter: 'Invalid adapter'
};

Messenger.prototype.receive = function messengerRecieve(message) {
  this.request = message;

  this.readyToSend = message.validate();

  return this.readyToSend;
};

Messenger.prototype.send = function messengerSend() {
  return this.readyToSend && this.messagingAdapter.send(this.request);
};

module.exports = Messenger;
