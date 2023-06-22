import Sequelize from 'sequelize';

const { Model } = Sequelize;

export default class Year extends Model {
  static init(sequelize) {
    super.init({
      year: Sequelize.INTEGER,
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.YearMonth, { foreignKey: 'id' });
  }
}
