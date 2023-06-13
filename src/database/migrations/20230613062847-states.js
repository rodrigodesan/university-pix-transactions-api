module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('states', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      }, 
      ibge_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      region: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  {
          model: 'regions',
          key: 'id'
        },
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

  async down (queryInterface) {
    await queryInterface.dropTable('states');
  }
};
