// import { App } from '../app.interface';

import accessTokensModel from './access-tokens.model';
import playersModel from './players.model';
import walletsModel from './wallets.model';

export default (app: any): void => {
  accessTokensModel(app);
  playersModel(app);
  walletsModel(app);
}
