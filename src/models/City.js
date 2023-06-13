const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class City extends Model {
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

module.exports = City;