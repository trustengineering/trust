const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => {

  Given(/^Jane has found a way to contact us$/, () => null);

  When(/^she completes the required details correctly$/, () => null);

  When(/^sends them to us$/, () => null);

  Then(/^she receives confirmation that their message has been sent$/, () => null);

});
