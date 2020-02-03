import { Application } from 'express';

import accessTokensModel from './access-tokens.model';
import playersModel from './players.model';
import walletsModel from './wallets.model';

export default (app: Application): void => {
  accessTokensModel(app);
  playersModel(app);
  walletsModel(app);
}
