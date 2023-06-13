const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Year extends Model {
  static init(sequelize) {
    super.init({
      year: Sequelize.INTEGER,
    }, {
      sequelize,
    });
    return this;
  }
}

module.exports = Year;