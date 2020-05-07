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
          descriptionFr: "Applique activement",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Casually looking",
          descriptionFr: "Regarde les opportunités mine de rien",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Not looking but open to offers",
          descriptionFr: "Ne cherche pas mais est ouvert aux offres",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Not looking",
          descriptionFr: "Ne cherche pas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
  },
};
