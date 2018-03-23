import { expect } from '../support/expect';
import { fakeMessage } from '../support/stubs';
import AwsSesChannel from '../../src/domain/channels/aws-ses-channel';
import Message from '../../src/domain/message';

describe('An AwsSesChannel', () => {
  it('should be able to send emails without crashing', () => {
    const ses = new AwsSesChannel();
    const fakeMsg = new Message(fakeMessage);

    return expect(ses.send(fakeMsg)).eventually.to.be.fulfilled;
  });
});
