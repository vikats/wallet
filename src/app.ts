import express from 'express';
import bodyParser from 'body-parser';

import {
  PORT,
  API_PREFIX,
  BAD_REQUEST_CODE
} from './constants/api';

import sequelize from './sequelize';
import models from './models';

import { isTrustOrigin } from './middlewares/is-trust-origin';
import { login } from './controllers/login';
import { verifyPlayerToken } from './controllers/verify-one-time-token';
import { withdrawBalance } from './controllers/withdraw-balance';
import { depositBalance } from './controllers/deposit-balance';


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

sequelize(app);
models(app);

app.post(`${ API_PREFIX }/login`, login);

app.use(isTrustOrigin);
app.post(`${ API_PREFIX }/tokens/verify`, verifyPlayerToken);
app.post(`${ API_PREFIX }/wallets/withdraw`, withdrawBalance);
app.post(`${ API_PREFIX }/wallets/deposit`, depositBalance);
app.use('/', (_, res) => res.sendStatus(BAD_REQUEST_CODE));

app.listen(PORT, () => console.log(`Server is listening on port ${ PORT }`));

export default app;
