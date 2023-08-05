module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('logins', 'user', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('logins', 'user');
  },
};
