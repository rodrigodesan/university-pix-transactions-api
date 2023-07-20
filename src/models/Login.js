import Sequelize from 'sequelize';

const { Model } = Sequelize;

export default class Login extends Model {
  static init(sequelize) {
    super.init({
      latitude: Sequelize.STRING,
      longitude: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user' });
  }
}
