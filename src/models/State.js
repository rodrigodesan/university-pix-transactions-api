const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class State extends Model {
  static init(sequelize) {
    super.init({
      ibge_code: Sequelize.INTEGER,
      name: Sequelize.STRING,
      region: Sequelize.INTEGER,
    }, {
      sequelize,
    });
    return this;
  }
}

module.exports = State;