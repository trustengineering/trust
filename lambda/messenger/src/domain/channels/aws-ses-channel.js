import aws from 'aws-sdk';
import createEnv from '../../../../scripts/env';
import { textEmailFrom, htmlEmailFrom } from '../../templates';

class AwsSesChannel {
  static defaultCharSet() {
    return 'UTF-8';
  }

  static send(message) {
    const ses = new AwsSesChannel();
    return ses.send(message);
  }

  createSesParams(message, env) { // eslint-disable-line
    const { verifiedSenderEmailAddress, recipientEmailAddress } = env.emails;
    const { subject, sender } = message.rawMessage;

    const awsSesSender = `${sender.name} (${sender.email})  <${verifiedSenderEmailAddress}>`;
    const params = {
      Source: awsSesSender,
      ReplyToAddresses: [sender.email],
      Destination: {
        ToAddresses: [recipientEmailAddress]
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: AwsSesChannel.defaultCharSet()
        },
        Body: {
          Text: {
            Data: textEmailFrom(message),
            Charset: AwsSesChannel.defaultCharSet()
          },
          Html: {
            Data: htmlEmailFrom(message),
            Charset: AwsSesChannel.defaultCharSet()
          }
        }
      }
    };

    return params;
  }

  async send(message) {
    const ses = new aws.SES();

    const env = await createEnv();

    return new Promise((resolve, reject) => {
      ses.sendEmail(this.createSesParams(message, env), (err, data) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          console.log('Email sent! Message ID: ', data.MessageId);
          resolve(data.MessageId);
        }
      });
    });
  }
}

export { AwsSesChannel as default };
