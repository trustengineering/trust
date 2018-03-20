/*

 */
import Message from './message';
import Messenger from './messenger';

const domain = {};

domain.Message = Message;
domain.Messenger = Messenger;

export { domain as default, Message, Messenger };
