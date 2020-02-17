"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "careerMobilities",
      [
        {
          descriptionEn: "Fit",
          descriptionFr: "Bien placé dans son poste",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Move to more suitable role",
          descriptionFr: "Transfert vers un rôle plus approprié",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Develop in role",
          descriptionFr: "Se perfectionner dans son rôle",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Well-placed in role",
          descriptionFr: "Bien placé dans le rôle",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Ready for lateral movement",
          descriptionFr: "Prêt pour un mouvement latéral",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Ready for advancement",
          descriptionFr: "Prêt à être promu",
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
    return queryInterface.bulkDelete("careerMobilities", null, {});
  }
};
