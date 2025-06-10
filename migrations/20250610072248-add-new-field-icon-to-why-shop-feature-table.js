'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if column "icon" exists before adding
    const tableName = 'why_shop_features';
    const columnName = 'icon';

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
        allowNull: true,
        comment: 'This stores the URL/path to the icon',
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableName = 'why_shop_features';
    const columnName = 'icon';

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
