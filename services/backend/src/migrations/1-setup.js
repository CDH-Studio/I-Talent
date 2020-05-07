"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("SequlizeSeeder").then(() => {
      return queryInterface.sequelize.query(
        'DROP EXTENSION IF EXISTS "uuid-ossp";'
      );
    });
  },
};
