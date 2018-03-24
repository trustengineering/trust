/*

 */

import { Messenger } from './domain';
import messengerContainer from './ioc/messenger-container'; // eslint-disable-line
import Message from './domain/message';

const messenger = (event, context, callback) => {
  const Channel = messengerContainer.get('Channel');
  Messenger.send(new Message(event.body), new Channel());

  callback(null, {
    status: 'ok'
  });
};

export { messenger as default, messenger };
