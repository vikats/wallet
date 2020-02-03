import { Application } from 'express';
import { DataTypes } from 'sequelize';

import { Players } from '../repositories';

export default (app: Application) => {
  const sequelize = app.get('dbConnection');

  Players.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'players',
    modelName: 'players',
  });

  return Players;
};
