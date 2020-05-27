module.exports = {
  up: (queryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      'tenures',
      [
        {
          descriptionEn: 'Term',
          descriptionFr: 'Période',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: 'Casual',
          descriptionFr: 'Temporaire',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: 'Indeterminate',
          descriptionFr: 'Indéterminé',
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
    return queryInterface.bulkDelete('tenures', null, {});
  },
};
