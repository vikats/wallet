import { Application } from 'express';
import { NOT_FOUND } from 'http-status-codes';

import { API_PREFIX } from '../constants';

import { isTrustOrigin } from '../middlewares';

import { login } from './login';
import { verifyPlayerToken } from './verify-one-time-token';
import { withdrawBalance } from './withdraw-balance';
import { depositBalance } from './deposit-balance';

export default (app: Application): void => {
  app.post(`${ API_PREFIX }/login`, login);

  app.use(isTrustOrigin);
  app.post(`${ API_PREFIX }/tokens/verify`, verifyPlayerToken);
  app.post(`${ API_PREFIX }/wallets/withdraw`, withdrawBalance);
  app.post(`${ API_PREFIX }/wallets/deposit`, depositBalance);
  app.use('*', (_, res) => res.sendStatus(NOT_FOUND));
}
