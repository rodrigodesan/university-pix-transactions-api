const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Region extends Model {
  static init(sequelize) {
    super.init({
      acronym: Sequelize.STRING,
      name: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }
}

module.exports = Region;