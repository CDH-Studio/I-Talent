"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "competencies",
      [
        {
          descriptionEn: "Thinking things through",
          descriptionFr: "Réflexion approfondie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Achieve results",
          descriptionFr: "Obtenir des résultats",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
    // .then(() => {
    //   return queryInterface.bulkInsert(
    //     "competencies",
    //     [
    //       {
    //         id: "3a57095e-0174-11ea-8d71-362b9e155667",
    //         descriptionEn: "Humor",
    //         descriptionFr: "Sens de l'humour",
    //         createdAt: new Date(),
    //         updatedAt: new Date()
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
    return queryInterface.bulkDelete("competencies", null, {});
  }
};
