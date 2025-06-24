'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = 'cart_items';
    const columnName = 'guestId';

    // Step 1: Check if column exists
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
      // Step 2: Add column as nullable
      await queryInterface.addColumn(tableName, columnName, {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Stores guest identifier for unauthenticated users',
      });

      // Step 3: Optional — Set default guestId for existing records
      // You can skip this if you plan to handle nulls in your app
      await queryInterface.sequelize.query(`
        UPDATE "${tableName}"
        SET "${columnName}" = 'anonymous'
        WHERE "${columnName}" IS NULL
      `);

      // Step 4: Change column to NOT NULL
      await queryInterface.changeColumn(tableName, columnName, {
        type: Sequelize.STRING,
        allowNull: false,
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
