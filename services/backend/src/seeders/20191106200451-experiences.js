"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "experiences",
      [
        {
          organization: "Healt Canada",
          jobTitle: "Medical Officer",
          description:
            "Overseeing the medical care of patients and the functions performed by medical staff",
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667",
        },
        {
          organization: "Canada Revenue Agency",
          jobTitle: "Financial Analyst",
          description:
            "Cancelled payments and monitored unauthorized purchases",
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667",
        },
        {
          organization: "Banque du Canada",
          jobTitle: "Gestionnaire de projet TI",
          description:
            "Livrer les project à temps et maintenir le contact avec les clients",
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          profileId: "faba08aa-ffe3-11e9-8d71-362b9e155667",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("experiences", null, {});
  },
};
