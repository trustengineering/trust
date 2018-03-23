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

const fakeMessage = {
  subject: 'This is a message from an integration test.',
  body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque commodo nisl eget gravida consectetur. Etiam in suscipit mauris, in consectetur arcu. Ut leo nunc, aliquam quis tortor a, laoreet tempus dui. Praesent commodo scelerisque vestibulum. Vivamus pellentesque ligula vel nunc porttitor, et consequat dolor vestibulum. Proin non luctus metus, sit amet laoreet lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut odio lacus, facilisis eu eros et, tincidunt consectetur massa.

              Praesent at augue sit amet tellus dignissim mattis. Mauris nec mauris mattis, vestibulum mi at, pharetra erat. Vivamus dapibus mi ut mollis ullamcorper. Duis vestibulum molestie mi, eget fringilla nisl elementum bibendum. Nullam vel semper nulla. Proin laoreet leo sed nisi laoreet lacinia. Aliquam sit amet felis leo. Aenean auctor ipsum eu mauris sagittis, ut varius magna iaculis.

              Donec gravida vulputate turpis. Duis eu justo non nisl dapibus feugiat vitae et ligula. Nulla sodales purus vitae nulla sollicitudin faucibus. Fusce nec dui nulla. Nunc non mollis sapien, mattis tincidunt neque. Sed aliquam dolor ac enim ultrices, a pharetra nunc sodales. Aliquam rutrum scelerisque porttitor. Morbi sodales laoreet lobortis. Nullam vitae nisl sed enim cursus luctus. Nullam lobortis, quam ut iaculis aliquam, nunc enim mattis purus, ut egestas nunc sem vel mi.`,
  sender: {
    name: 'Integration Test',
    email: 'lewis@trustengineering.io'
  }
};

module.exports = {
  validMessage,
  invalidMessage,
  fakeMessage
};
