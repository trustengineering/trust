class MockChannel {
  constructor() {
    this.messages = [];
  }

  send(msg){  // eslint-disable-line
    this.messages.push(msg.rawMessage);
    return msg;
  }
}

export default MockChannel;
