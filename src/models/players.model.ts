import { DataTypes } from 'sequelize';

// import { App } from '../app.interface';
import { Players } from '../repositories';

export default (app: any) => {
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
