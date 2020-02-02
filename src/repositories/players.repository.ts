import { Model } from 'sequelize';

export class Players extends Model {
  public static readonly primaryKeyAttribute = 'id';

  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Players.hasMany(models.accessTokens, {
      sourceKey: 'id',
      foreignKey: 'playerId',
    });
    Players.hasOne(models.wallets, {
      sourceKey: 'id',
      foreignKey: 'playerId',
    });
  }

  public static findByUsernameAndPassword(username: string, password: string) {
    return this.findOne({
      attributes: ['id'],
      where: {
        username,
        password,
      },
    });
  }
}
