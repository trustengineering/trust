class LogChannel {
  constructor(postSendFn) {
    this.postSendFn = postSendFn;
  }

  send(msg) {
    console.log(`msg = `, msg); // eslint-disable-line
    this.postSendFn(msg);
  }
}

export default LogChannel;
