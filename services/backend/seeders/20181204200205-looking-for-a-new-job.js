"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "lookingForANewJobs",
      [
        {
          descriptionEn: "Actively applying",
          descriptionFr: "La actively applying",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Casually looking",
          descriptionFr: "Le casually looking",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Not looking but open to offers",
          descriptionFr: "Le not looking but open to offers",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Not looking",
          descriptionFr: "Le not looking",
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
    return queryInterface.bulkDelete("lookingForANewJobs", null, {});
  }
};
