class LogChannel {
  constructor(postSendFn) {
    this.postSendFn = postSendFn;
  }

  send(msg) {
    this.postSendFn(msg);
  }
}

export default LogChannel;
