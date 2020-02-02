import crypto from 'crypto';

const cryptoValue =  {
  alg: 'aes-256-cbc',
  key: 'uxrywmqxyigfcjndtgmbbsnzlkegjuso', // 32 length
  salt: 'kzqwootmgxudutze' // 16 length
};

function createHash(string: string) {
  return crypto
    .createHash('sha256')
    .update(string)
    .digest('base64');
}

function decryptToken(text: string | string[]) {
  const { alg, key, salt } = cryptoValue;
  const decipher = crypto.createDecipheriv(alg, Buffer.from(key), Buffer.from(salt));

  return decipher
    .update(text, 'hex', 'utf8')
    .concat(decipher.final('utf8'));
}

export {
  createHash,
  decryptToken,
}
