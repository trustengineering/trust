/**
 * A Messenger receives messages. Tries to validate them and sends them on via a specified channel
 *
 */

import { Validations } from '@trust/core';

class Messenger {
  static send(message, channel) {
    const m = new Messenger(channel);

    m.receive(message);
    m.send();
  }

  constructor(channel) {
    if (!Validations.isDefined(channel) || !Validations.isAFunction(channel.send)) {
      throw new Error(Messenger.Errors.InvalidChannel);
    }

    this.messagingAdapter = channel;
    this.readyToSend = false;
    this.message = null;

    Object.seal(this);
  }

  receive(message) {
    if (!Validations.isDefined(message) || !Validations.isAFunction(message.validate)) {
      throw new Error(Messenger.Errors.InvalidMessage);
    }

    this.message = message;
    this.readyToSend = message.validate();
    Object.freeze(this);

    return this.readyToSend;
  }

  send() {
    return this.readyToSend && this.messagingAdapter.send(this.message);
  }
}

Messenger.Errors = {
  InvalidChannel: 'Invalid channel',
  InvalidMessage: 'Invalid message'
};

export default Messenger;
