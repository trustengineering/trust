/**
 *
 */

import { Validations } from '@trust/core';

class Message {
  constructor(rawMessage) {
    this.rawMessage = rawMessage;
  }

  validate() {
    const isValid = rawMessage =>
      Validations.isDefined(rawMessage) &&
      Validations.isDefined(rawMessage.sender) &&
      Validations.isAString(rawMessage.subject) &&
      Validations.isAString(rawMessage.body) &&
      Validations.isAString(rawMessage.sender.email) &&
      Validations.isAString(rawMessage.sender.name);

    if (!isValid(this.rawMessage)) {
      throw new Error(Message.Errors.invalidMessage);
    }

    return true;
  }
}

Message.Errors = {
  invalidMessage: 'Invalid message'
};

export default Message;
