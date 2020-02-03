import { Sequelize, Options } from 'sequelize';
import { Application } from 'express';
import config from 'config';

import mocks from './mocks/players.json';

import { createHash } from './utils/hash-string';

const { DB_URI } = process.env;

export default async function(app: Application): Promise<any> {
  const { uri } = config.get('database');

  const sequelizeOptions: Options = {
    logging: false,
    define: {
      freezeTableName: true,
      charset: 'utf8mb4',
    },
    pool: {
      max: 20,
      min: 0,
      idle: 20000,
    },
  };

  const sequelize: Sequelize = new Sequelize(DB_URI || uri, sequelizeOptions);

  app.set('dbConnection', sequelize);

  const { models } = sequelize;
  Object.keys(models).forEach(name => {
    const model: any = models[name];
    model.associate(models);
  });

  await sequelize.sync({ force: true });

  // for dev purpose only.
  await createPlayers(models);
}

async function createPlayers(models: any) {
  const users = mocks.map(({ username, password }: any) => (
    {
      username,
      password: createHash(password),
    }
  ));

  const createdUsers = await models.players.bulkCreate(users);

  const wallets = createdUsers.map(({ id }: any) => ({ playerId: id }));

  return models.wallets.bulkCreate(wallets);
}
