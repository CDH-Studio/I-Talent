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
          updatedAt: new Date()
        },
        {
          readingProficiency: "A",
          writingProficiency: "B",
          oralProficiency: "C",
          readingDate: new Date(),
          writingDate: new Date(),
          oralDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
    // .then(() => {
    //   return queryInterface.bulkInsert(
    //     "secondLanguageProficiencies",
    //     [
    //       {
    //         id: "91485e4c-ffdb-11e9-8d71-362b9e155667",
    //         readingProficiency: "A",
    //         writingProficiency: "C",
    //         oralProficiency: "B",
    //         readingDate: new Date(),
    //         writingDate: new Date(),
    //         oralDate: new Date(),
    //         createdAt: new Date(),
    //         updatedAt: new Date()
    //       },
    //       {
    //         id: "a34e38b4-ffdb-11e9-8d71-362b9e155667",
    //         readingProficiency: "A",
    //         writingProficiency: "B",
    //         oralProficiency: "A",
    //         readingDate: new Date(),
    //         writingDate: new Date(),
    //         oralDate: new Date(),
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
    return queryInterface.bulkDelete("secondLanguageProficiencies", null, {});
  }
};
