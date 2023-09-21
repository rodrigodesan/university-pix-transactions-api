module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('year_months', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      month_num: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      month: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'years',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('year_months');
  },
};
