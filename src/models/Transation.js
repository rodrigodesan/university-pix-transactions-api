const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Transation extends Model {
  static init(sequelize) {
    super.init({
      vl_individual_payer: Sequelize.FLOAT,
      qt_individual_payer: Sequelize.INTEGER,
      vl_company_payer: Sequelize.FLOAT,
      qt_company_payer: Sequelize.INTEGER,
      vl_individual_receiver: Sequelize.FLOAT,
      qt_individual_receiver: Sequelize.INTEGER,
      vl_company_receiver: Sequelize.FLOAT,
      qt_company_receiver: Sequelize.INTEGER,
      city: Sequelize.INTEGER,
      year_month: Sequelize.INTEGER,
    }, {
      sequelize,
    });
    return this;
  }
}

module.exports = Transation;