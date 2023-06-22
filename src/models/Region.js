import Sequelize from 'sequelize';

const { Model } = Sequelize;

export default class Region extends Model {
  static init(sequelize) {
    super.init({
      acronym: Sequelize.STRING,
      name: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.State, { foreignKey: 'region' });
  }
}
