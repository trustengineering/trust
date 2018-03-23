import fs from 'fs';
import path from 'path';

import aws from 'aws-sdk';

const encrypt = buffer => {
  const kms = new aws.KMS();

  return new Promise((resolve, reject) => {
    const params = {
      KeyId: process.env.AWS_KMS_CMK_ARN,
      Plaintext: buffer // The data to encrypt.
    };
    kms.encrypt(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.CiphertextBlob);
      }
    });
  });
};

const decrypt = buffer => {
  const kms = new aws.KMS();

  return new Promise((resolve, reject) => {
    const params = {
      CiphertextBlob: buffer // The data to dencrypt.
    };
    kms.decrypt(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Plaintext);
      }
    });
  });
};

const encryptFile = (inputFile, outputFile) => {
  const input = fs.readFileSync(path.resolve(process.cwd(), inputFile));
  encrypt(Buffer.from(input, 'UTF-8')).then(encrypted => {
    fs.writeFileSync(path.resolve(process.cwd(), outputFile), encrypted);
  });
};

const decryptFile = (inputFile, outputFile) => {
  const input = fs.readFileSync(path.resolve(process.cwd(), inputFile));
  decrypt(Buffer.from(input, 'UTF-8')).then(decrypted => {
    fs.writeFileSync(path.resolve(process.cwd(), outputFile), decrypted);
  });
};

export { encrypt, decrypt, encryptFile, decryptFile };
