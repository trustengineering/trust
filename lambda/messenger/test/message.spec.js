/**
 * eslint-env node, mocha
 *
 */

const { expect } = require('./support/expect');
const { Message } = require('../src/domain');

describe('A Message', () => {
  it('should fail validation when no sender is provided', () => {
    expect(() => {
      const message = new Message({
        subject: 'foo',
        body: 'bar'
      });

      message.validate();
    }).to.throw('Invalid message');
  });

  it('should validate a valid message payload', () => {
    const testMessageValidation = () => {
      const message = new Message({
        subject: 'foo',
        body: 'bar',
        sender: {
          name: 'foo bar',
          email: 'foo.bar@baz.com'
        }
      });

      return message.validate();
    };

    expect(testMessageValidation()).to.be.equal(true);
  });
});
