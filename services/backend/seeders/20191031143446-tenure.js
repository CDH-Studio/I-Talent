"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "tenures",
      [
        {
          descriptionEn: "Acting",
          descriptionFr: "Par intérim",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Assignment",
          descriptionFr: "Affectation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Secondment-in",
          descriptionFr: "Détachement",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete("tenures", null, {});
  }
};
