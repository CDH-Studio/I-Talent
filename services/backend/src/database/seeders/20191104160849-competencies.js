module.exports = {
	up: (queryInterface) => {
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
					updatedAt: new Date(),
				},
				{
					descriptionEn: "Achieve results",
					descriptionFr: "Obtenir des résultats",
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

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
		return queryInterface.bulkDelete("competencies", null, {});
	},
};
