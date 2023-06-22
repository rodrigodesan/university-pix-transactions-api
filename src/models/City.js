import Sequelize from 'sequelize';

const { Model } = Sequelize;

export default class City extends Model {
  static init(sequelize) {
    super.init({
      ibge_code: Sequelize.INTEGER,
      name: Sequelize.STRING,
      state: Sequelize.INTEGER,
    }, {
      sequelize,
    });
    return this;
  }
}
