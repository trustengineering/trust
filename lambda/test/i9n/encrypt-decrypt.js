import { expect } from '../support/expect';
import { encrypt, decrypt } from '../../scripts/kms';

const UTF8 = 'UTF-8';

describe('Encryting / decrypting', () => {
  it('should just work', () => {
    const original = 'The quick brown fox jumps over the lazy dog';

    return encrypt(Buffer.from(original, UTF8))
      .then(encrypted => decrypt(Buffer.from(encrypted, UTF8)))
      .then(decrypted => {
        expect(decrypted.toString('UTF-8')).to.equal(original);
      });
  });
});
