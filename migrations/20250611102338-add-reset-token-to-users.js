'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add resetToken column if it doesn't exist
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'users' AND column_name = 'resetToken'
        ) THEN
          ALTER TABLE "users" ADD COLUMN "resetToken" VARCHAR;
        END IF;
      END;
      $$;
    `);

    // Add resetTokenExpiresAt column if it doesn't exist
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'users' AND column_name = 'resetTokenExpiresAt'
        ) THEN
          ALTER TABLE "users" ADD COLUMN "resetTokenExpiresAt" TIMESTAMP;
        END IF;
      END;
      $$;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove both columns safely
    await queryInterface.removeColumn('users', 'resetToken');
    await queryInterface.removeColumn('users', 'resetTokenExpiresAt');
  },
};
