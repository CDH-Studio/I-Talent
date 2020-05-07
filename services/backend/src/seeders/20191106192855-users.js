"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface
      .bulkInsert(
        "users",
        [
          {
            name: "John Doe",
            email: "john.doe@canada.ca",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      )
      .then(() => {
        return queryInterface.bulkInsert(
          "users",
          [
            {
              id: "faba08aa-ffe3-11e9-8d71-362b9e155667",
              name: "Mary Doe",
              email: "mary.doe@canada.ca",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          {}
        );
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("users", null, {});
  },
};
