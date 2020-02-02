import { Model } from 'sequelize';

export class Wallets extends Model {
  public static readonly primaryKeyAttribute = 'id';

  public id!: number;
  public balance!: number;
  public playerId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Wallets.belongsTo(models.players, { targetKey: 'id' });
  }

  public static getByPlayerId(playerId: number) {
    return this.findOne({
      where: {
        playerId
      }
    });
  }
}
