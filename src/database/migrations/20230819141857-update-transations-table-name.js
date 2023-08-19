module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameTable('transations', 'transactions');
  },

  down: async (queryInterface) => {
    await queryInterface.renameTable('transactions', 'transations');
  },
};
