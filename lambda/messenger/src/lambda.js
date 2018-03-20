/*

 */

import { Messenger } from './domain';
import LogChannel from './domain/channels/log-channel';
import Message from "./domain/message";

const messenger = (event, context, callback) => {
  Messenger.send(
    new Message(event.body),
    new LogChannel(msg => {
      callback(null, msg.rawMessage);
    })
  );

  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: 'Go Serverless v1.0! Your function executed successfully!',
  //     input: event
  //   })
  // };
  //
  // callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

export default messenger;
