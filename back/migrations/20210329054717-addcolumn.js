'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'snsId', {
      type: Sequelize.STRING(30),
      allowNull: true,
    });
    queryInterface.addColumn('Users', 'provider', {
      type: Sequelize.STRING(10),
      allowNull: false,
      defaultValue: 'local',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
