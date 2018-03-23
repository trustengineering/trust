import { promisify } from 'es6-promisify';
import { expect } from '../support';

import messenger from '../../messenger/src/lambda';

const { Given, When, Then } = require('cucumber');

const lambdaMessenger = promisify(messenger);
import { validMessage } from '../../messenger/test/support/stubs';

const steps = () => {
  const context = {};

  Given(/^Jane has found a way to contact us$/, () => {
    context.lambdaMessenger = lambdaMessenger;
  });

  When(/^she sends her details to us$/, () => {
    context.event = {
      body: validMessage
    };
  });

  Then(/^she receives confirmation that their message has been sent$/, () =>
    expect(context.lambdaMessenger(context.event, {})).eventually.to.deep.equal({ status: 'ok' })
  );
};

steps();
