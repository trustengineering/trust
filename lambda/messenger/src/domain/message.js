/**
 *
 */

const validations = require('./validations');

class Message{
  constructor(rawMessage){
    this.rawMessage = rawMessage;
  }

  validate(){
    const isValid = rawMessage =>
      validations.isDefined(rawMessage) &&
      validations.isDefined(rawMessage.sender) &&
      validations.isAString(rawMessage.subject) &&
      validations.isAString(rawMessage.body) &&
      validations.isAString(rawMessage.sender.email) &&
      validations.isAString(rawMessage.sender.name);

    if (!isValid(this.rawMessage)) {
      throw new Error(Message.Errors.invalidMessage);
    }

    return true;
  }
}

Message.Errors = {
  invalidMessage: 'Invalid message'
};

module.exports = Message;
