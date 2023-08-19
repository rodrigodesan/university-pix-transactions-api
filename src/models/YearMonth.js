import Sequelize from 'sequelize';

const { Model } = Sequelize;

export default class YearMonth extends Model {
  static init(sequelize) {
    super.init({
      month_num: Sequelize.INTEGER,
      month: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Transaction, { foreignKey: 'year_month' });
    this.belongsTo(models.Year, { foreignKey: 'year' });
  }
}
