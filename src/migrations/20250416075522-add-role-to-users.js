'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM('admin', 'store_owner', 'customer'),
      defaultValue: 'store_owner',
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'role');
  },
};
