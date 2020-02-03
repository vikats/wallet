import crypto from 'crypto';
import config from 'config';

function createHash(toHash: object) {
  const { secret } = config.get('crypto');

  const string = JSON.stringify(toHash);

  return crypto
    .createHmac('sha256', secret)
    .update(string)
    .digest('base64');
}

export {
  createHash,
}
