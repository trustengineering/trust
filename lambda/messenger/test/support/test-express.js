import { startExpress } from './express-server';

startExpress().then(() => {
  console.log('express server started');
  setTimeout(Function.prototype, 30 * 1000);
});
