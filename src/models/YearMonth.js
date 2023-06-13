const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class YearMonth extends Model {
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

module.exports = YearMonth;