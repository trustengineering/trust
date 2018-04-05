// noinspection ES6CheckImport
import { container } from '@trust/core'; // eslint-disable-line
import AwsSesChannel from '../domain/channels/aws-ses-channel';

const messengerContext = container.init({
  Channel: AwsSesChannel
});

export { messengerContext as default, messengerContext };
