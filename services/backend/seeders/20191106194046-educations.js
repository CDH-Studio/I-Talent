"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "education",
      [
        {
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
    // .then(() => {
    //   return queryInterface.bulkInsert(
    //     "education",
    //     [
    //       {
    //         id: "9060e28e-ffe4-11e9-8d71-362b9e155667",
    //         startDate: new Date(),
    //         endDate: new Date(),
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //         profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667",
    //         schoolId: "482a25e6-ffe6-11e9-a69e-362b9e155667",
    //         diplomaId: "bbd95b12-ffe4-11e9-8d71-362b9e155667"
    //       },
    //       {
    //         id: "2b7433a2-ffe5-11e9-8d71-362b9e155667",
    //         startDate: new Date(),
    //         endDate: new Date(),
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //         profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667",
    //         schoolId: "4d205016-ffe6-11e9-8d71-362b9e155667",
    //         diplomaId: "06688220-ffe5-11e9-8d71-362b9e155667"
    //       }
    //     ],
    //     {}
    //   );
    // });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("education", null, {});
  }
};
