import Sequelize from 'sequelize';

const { Model } = Sequelize;

export default class YearMonth extends Model {
  static init(sequelize) {
    super.init({
      month_num: Sequelize.INTEGER,
      month: Sequelize.STRING,
      year: Sequelize.INTEGER,
    }, {
      sequelize,
    });
    return this;
  }
}
