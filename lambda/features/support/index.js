import chai from 'chai';
import chaisAsPromised from 'chai-as-promised';

const { expect } = chai;

chai.use(chaisAsPromised);

module.exports = {
  chai,
  expect
};
