module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('transations', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      }, 
      vl_individual_payer: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      qt_individual_payer: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vl_company_payer: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      qt_company_payer: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vl_individual_receiver: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      qt_individual_receiver: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vl_company_receiver: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      qt_company_receiver: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      city: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  {
          model: 'cities',
          key: 'id'
        },
      },
      year_month: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  {
          model: 'year_months',
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
    await queryInterface.dropTable('transations');
  }
};
