import { Model } from 'sequelize';

export class AccessTokens extends Model {
  public static readonly primaryKeyAttribute = 'id';

  public id!: number;
  public oneTimeToken!: string;
  public expired!: boolean;
  public playerId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    AccessTokens.belongsTo(models.players, { targetKey: 'id' });
  }

  public static findByTokenValue(oneTimeToken: string) {
    return this.findOne({
      where: {
        oneTimeToken,
      },
    })
  }
}
