/*

 */

const validMessage = {
  subject: `Test email`,
  sender: {
    email: `foo.bar@mailinator.com`,
    name: `Foo Bar`
  },
  body: `Hello there,
    
    This is a test email. 
    
    Thanks,
    
    
    From me.
    `
};

const invalidMessage = {
  subject: `Test email`,
  body: `Hello there,
    
    This is a test email. 
    
    Thanks,
    
    
    From me.
    `
};

module.exports = {
  validMessage,
  invalidMessage
};
