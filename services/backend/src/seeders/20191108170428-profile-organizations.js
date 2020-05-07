"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "profileOrganizations",
      [
        {
          descriptionEn: "Innovation, Science and Economic Development Canada",
          descriptionFr:
            "Innovation, Sciences et Développement économique Canada",
          tier: "0",
          createdAt: new Date(),
          updatedAt: new Date(),
          profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667"
        },
        {
          descriptionEn: "DIGITAL TRANSFORMATION SERVICE SECTOR",
          descriptionFr: "SECTEUR DES SERVICES DE TRANSFORMATION NUMERIQUE",
          tier: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
          profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667"
        },
        {
          descriptionEn: "Chief Information Office",
          descriptionFr: "Bureau de l'information en chef",
          tier: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
          profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667"
        },
        {
          descriptionEn: "Digital Services Division",
          descriptionFr: "Division des services numériques",
          tier: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
          profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667"
        },
        {
          descriptionEn: "Business Line Solutions Directorate",
          descriptionFr: "Direction des solutions métiers",
          tier: "4",
          createdAt: new Date(),
          updatedAt: new Date(),
          profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667"
        },
        {
          descriptionEn: "Innovation, Science and Economic Development Canada",
          descriptionFr:
            "Innovation, Sciences et Développement économique Canada",
          tier: "0",
          createdAt: new Date(),
          updatedAt: new Date(),
          profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667"
        },
        {
          descriptionEn: "DIGITAL TRANSFORMATION SERVICE SECTOR",
          descriptionFr: "SECTEUR DES SERVICES DE TRANSFORMATION NUMERIQUE",
          tier: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
          profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667"
        },
        {
          descriptionEn: "Chief Information Office",
          descriptionFr: "Bureau de l'information en chef",
          tier: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
          profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667"
        },
        {
          descriptionEn: "Digital Services Division",
          descriptionFr: "Division des services numériques",
          tier: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
          profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667"
        },
        {
          descriptionEn: "Director General's Office",
          descriptionFr: "Bureau du directeur général",
          tier: "4",
          createdAt: new Date(),
          updatedAt: new Date(),
          profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667"
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
    return queryInterface.bulkDelete("profileOrganizations", null, {});
  }
};
