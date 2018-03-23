/*

 */

import { Messenger } from './domain';
import AwsSesChannel from './domain/channels/aws-ses-channel';
import Message from './domain/message';

const messenger = (event, context, callback) => {
  Messenger.send(new Message(event.body), new AwsSesChannel());
};

export default messenger;
