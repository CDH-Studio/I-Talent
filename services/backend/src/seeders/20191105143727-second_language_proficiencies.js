"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "secondLanguageProficiencies",
      [
        {
          readingProficiency: "C",
          writingProficiency: "B",
          oralProficiency: "C",
          readingDate: new Date(),
          writingDate: new Date(),
          oralDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          readingProficiency: "A",
          writingProficiency: "B",
          oralProficiency: "C",
          readingDate: new Date(),
          writingDate: new Date(),
          oralDate: new Date(),
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

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("secondLanguageProficiencies", null, {});
  },
};
