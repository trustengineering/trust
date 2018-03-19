/**
 * A Messenger receives messages. Tries to validate them and sends them on via a specified channel
 *
 */

const validations = require('./validations');

class Messenger{

  constructor(channel){
    if (!validations.isDefined(channel) || !validations.isAFunction(channel.send)) {
      throw new Error(Messenger.Errors.InvalidChannel);
    }

    this.messagingAdapter = channel;
    this.readyToSend = false;
    this.message = null;

    Object.seal(this);
  }

  receive(message){
    if (!validations.isDefined(message) || !validations.isAFunction(message.validate)){
      throw new Error(Messenger.Errors.InvalidMessage);
    }

    this.message = message;
    this.readyToSend = message.validate();
    Object.freeze(this);

    return this.readyToSend;
  }

  send(){
    return this.readyToSend && this.messagingAdapter.send(this.message);
  }
}


Messenger.Errors = {
  InvalidChannel: 'Invalid channel',
  InvalidMessage: 'Invalid message',
};


module.exports = Messenger;
