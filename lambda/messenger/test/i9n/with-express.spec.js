import axios from 'axios';

import { expect } from '../support/expect';
import { startExpress, stopExpress } from '../support/express-server';
import { validMessage } from '../support/stubs';

describe('A Messenger Lambda (started via Express)', () => {
  before(startExpress);
  after(() => stopExpress());

  it('Should be healthy', () =>
    expect(
      axios.get('http://localhost:3000/status').then(res => Promise.resolve(res.data))
    ).to.eventually.deep.equal({ status: `ok` }));

  it('should be testable via Express', () =>
    expect(
      axios
        .post('http://localhost:3000/api/messages', validMessage)
        .then(res => Promise.resolve(res.data))
    ).to.eventually.deep.equal({
      status: 'ok'
    }));
});
