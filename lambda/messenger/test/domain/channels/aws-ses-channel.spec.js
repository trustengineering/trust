import { expect } from '../../support/expect';
import AwsSesChannel from '../../../src/domain/channels/aws-ses-channel';
import Message from '../../../src/domain/message';

describe('An AwsSesChannel', () => {
  it('should be able to send emails without crashing', () => {
    const ses = new AwsSesChannel();
    const fakeRawMessage = {
      subject: 'foo',
      body: 'bar',
      sender: {
        name: 'baz',
        email: 'foo@bar.com'
      }
    };
    const fakeMsg = new Message(fakeRawMessage);

    return expect(ses.send(fakeMsg)).eventually.to.be.fulfilled;
  });
});
