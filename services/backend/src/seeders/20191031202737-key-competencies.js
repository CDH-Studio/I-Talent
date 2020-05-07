"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "keyCompetencies",
      [
        {
          descriptionEn: "Achieve results",
          descriptionFr: "Obtenir des résultats",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Collaborate with partners and stakeholders",
          descriptionFr: "Collaborer avec les partenaires et les intervenants",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Create vision and strategy",
          descriptionFr: "Créer une vision et une stratégie",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Uphold integrity and respect",
          descriptionFr: "Préserver l'intégrité et le respect",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Mobilize people",
          descriptionFr: "Mobiliser des personnes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Promote innovation and guide change",
          descriptionFr: "Promouvoir l'innovation et orienter le changement",
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
    return queryInterface.bulkDelete("keyCompetencies", null, {});
  },
};
