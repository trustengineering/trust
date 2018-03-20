/*

 */

import { Messenger } from './domain';
import LogChannel from './domain/channels/log-channel';

const messenger = (event, context, callback) => {
  Messenger.send(
    event.body,
    new LogChannel(msg => {
      console.log(`msg = `, msg); // eslint-disable-line
      callback(null, msg);
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
