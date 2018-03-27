import { container } from '@trust/core'; // eslint-disable-line
import AwsSesChannel from '../domain/channels/aws-ses-channel';

const messengerContainer = container.init({
  Channel: AwsSesChannel
});

export { messengerContainer as default, messengerContainer };
