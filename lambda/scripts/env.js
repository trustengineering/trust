import path from 'path';
import fs from 'fs';
import { decrypt } from './kms';

// todo: move this to S3
const envFile = path.resolve(__dirname, '../_env/env.encrypted');

const env = () => decrypt(fs.readFileSync(envFile)).then(response => JSON.parse(response));

export default env;
