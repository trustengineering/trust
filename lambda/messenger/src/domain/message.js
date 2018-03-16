/**
 *
 */

const validations = require('./validations');

function Message(rawMessage) {
  this.rawMessage = rawMessage;
}

Message.Errors = {
  invalidRequest: 'Invalid message request'
};

Message.prototype.validate = function messageRequestValidate() {
  const isValid = rawMessage =>
    validations.isDefined(rawMessage) &&
    validations.isDefined(rawMessage.sender) &&
    validations.isAString(rawMessage.subject) &&
    validations.isAString(rawMessage.body) &&
    validations.isAString(rawMessage.sender.email) &&
    validations.isAString(rawMessage.sender.name);

  if (!isValid(this.rawMessage)) {
    throw new Error(Message.Errors.invalidRequest);
  }

  return true;
};

module.exports = Message;
