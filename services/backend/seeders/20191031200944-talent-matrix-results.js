"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "talentMatrixResults",
      [
        {
          descriptionEn: "Early promise",
          descriptionFr: "Employé(e) prometteur",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Exceptional talent",
          descriptionFr: "Futur dirigeant",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Future Achiever",
          descriptionFr: "Futur fonceur",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Growth Employee",
          descriptionFr: "Employé(e) en croissance",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Solid Contributor",
          descriptionFr: "Contributeur important",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Solid Professional",
          descriptionFr: "Professionnel solide",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Strong Performer",
          descriptionFr: "Employé(e) au Rendement élevé",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Talent Risk",
          descriptionFr: "Talent à risk",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Trusted Professional",
          descriptionFr: "Professionnel de confiance",
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
    return queryInterface.bulkDelete("talentMatrixResults", null, {});
  }
};
