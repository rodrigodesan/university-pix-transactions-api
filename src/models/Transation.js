import Sequelize from 'sequelize';

const { Model } = Sequelize;

export default class Transation extends Model {
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
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.YearMonth, { foreignKey: 'year_month' });
    this.belongsTo(models.City, { foreignKey: 'city' });
  }
}
