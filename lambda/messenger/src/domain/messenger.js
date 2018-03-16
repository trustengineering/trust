/**
 * A Messenger recieves requests and sends messages based on the recieved requests
 *
 */

const validations = require('./validations');

class Messenger{

  constructor(messagingAdapter){
    if (!validations.isDefined(messagingAdapter) || !validations.isAFunction(messagingAdapter.send)) {
      throw new Error(Messenger.Errors.InvalidAdapter);
    }

    this.messagingAdapter = messagingAdapter;
    this.readyToSend = false;
    this.request = null;

    Object.seal(this);
  }

  receive(message){
    this.request = message;

    this.readyToSend = message.validate();

    return this.readyToSend;
  }

  send(){
    return this.readyToSend && this.messagingAdapter.send(this.request);
  }
}


Messenger.Errors = {
  InvalidAdapter: 'Invalid adapter'
};


module.exports = Messenger;
