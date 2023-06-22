import Sequelize from 'sequelize';

const { Model } = Sequelize;

export default class State extends Model {
  static init(sequelize) {
    super.init({
      ibge_code: Sequelize.INTEGER,
      name: Sequelize.STRING,
      region: Sequelize.INTEGER,
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Region, { foreignKey: 'region' });
    this.hasMany(models.City, { foreignKey: 'state' });
  }
}
