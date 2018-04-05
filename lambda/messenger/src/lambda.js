/*

 */

import { Messenger } from './domain';
import messengerContext from './ioc/messenger-context'; // eslint-disable-line
import Message from './domain/message';

const messenger = (event, context, callback) => {
  const { parse } = JSON;

  try {
    const Channel = messengerContext.get('Channel');

    Messenger.send(new Message(parse(event.body)), new Channel());

    callback(null, {
      status: 'ok'
    });
  } catch (err) {
    callback(err, {
      status: 'not ok'
    });
  }
};

export { messenger as default, messenger };
