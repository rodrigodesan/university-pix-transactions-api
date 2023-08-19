import Sequelize from 'sequelize';

const { Model } = Sequelize;

export default class City extends Model {
  static init(sequelize) {
    super.init({
      ibge_code: Sequelize.INTEGER,
      name: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.State, { foreignKey: 'state' });
    this.hasMany(models.Transaction, { foreignKey: 'city' });
  }
}
