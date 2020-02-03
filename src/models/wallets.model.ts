import { Application } from 'express';
import { DataTypes } from 'sequelize';

import { Wallets } from '../repositories';

export default (app: Application) => {
  const sequelize = app.get('dbConnection');

  Wallets.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 10000,
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
    tableName: 'wallets',
    modelName: 'wallets',
  });

  return Wallets;
};
