module.exports = {
  up: (queryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "securityClearances",
      [
        {
          descriptionEn: "Reliability",
          descriptionFr: "Cote de fiabilité",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Secret",
          descriptionFr: "Secret",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Top Secret",
          descriptionFr: "Très Secret",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete("securityClearances", null, {});
  },
};
