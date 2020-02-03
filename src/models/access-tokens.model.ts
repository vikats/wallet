import { Application } from 'express';
import { DataTypes } from 'sequelize';

import { AccessTokens } from '../repositories';

export default (app: Application) => {
  const sequelize = app.get('dbConnection');

  AccessTokens.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    oneTimeToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    expired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    playerId: {
      type: DataTypes.INTEGER,
      field: 'player_id',
      allowNull: false,
      references: {
        model: 'players',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    tableName: 'access_tokens',
    modelName: 'accessTokens',
  });

  return AccessTokens;
};
