'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = 'cart_items';
    const columnName = 'guestId';

    // Check if column already exists
    const columnExists = await queryInterface.sequelize.query(
      `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = :tableName
        AND column_name = :columnName
      `,
      {
        replacements: { tableName, columnName },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (columnExists.length === 0) {
      await queryInterface.addColumn(tableName, columnName, {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Stores guest identifier for unauthenticated users',
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableName = 'cart_items';
    const columnName = 'guestId';

    const columnExists = await queryInterface.sequelize.query(
      `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = :tableName
        AND column_name = :columnName
      `,
      {
        replacements: { tableName, columnName },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (columnExists.length > 0) {
      await queryInterface.removeColumn(tableName, columnName);
    }
  },
};
