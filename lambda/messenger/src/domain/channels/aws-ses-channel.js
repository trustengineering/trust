import aws from 'aws-sdk';

class AwsSesChannel {
  static defaultCharSet() {
    return 'UTF-8';
  }

  static send(message) {
    const ses = new AwsSesChannel();
    return ses.send(message);
  }

  createSesParams(message) { // eslint-disable-line
    const verifiedSenderEmailAddress = 'info@trustengineering.io';
    const recipientEmailAddress = 'lewis@trustengineering.io';
    const { subject, body, sender } = message.rawMessage;

    // Provide the full path to your config.json file.
    // aws.config.loadFromPath('./config.json');

    // Replace sender@example.com with your "From" address.
    // This address must be verified with Amazon SES.
    const awsSesSender = `${sender.name} ( Website contact ) <${verifiedSenderEmailAddress}>`;

    // Replace recipient@example.com with a "To" address. If your account
    // is still in the sandbox, this address must be verified.
    // const recipient = 'recipient@example.com';

    // Specify a configuration set. If you do not want to use a configuration
    // set, comment the following variable, and the
    // ConfigurationSetName : configuration_set argument below.
    // const configuration_set = 'ConfigSet';

    // Specify the parameters to pass to the API.
    const params = {
      Source: awsSesSender,
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
            Data: body,
            Charset: AwsSesChannel.defaultCharSet()
          },
          Html: {
            Data: body,
            Charset: AwsSesChannel.defaultCharSet()
          }
        }
      }
      // , ConfigurationSetName: configuration_set
    };

    return params;
  }

  send(message) {
    // Create a new SES object.
    const ses = new aws.SES();
    // Try to send the email.

    return new Promise((resolve, reject) => {
      ses.sendEmail(this.createSesParams(message), (err, data) => {
        // If something goes wrong, print an error message.
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
