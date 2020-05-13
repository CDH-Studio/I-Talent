module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction(async (transaction) => {
			await queryInterface.createTable(
				"categories",
				{
					id: {
						type: Sequelize.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true, // initial value 0.. skills id is set to the associated number
						// need to figure out if 1) important to have
					},
					descriptionEn: {
						type: Sequelize.STRING,
					},
					descriptionFr: {
						type: Sequelize.STRING,
					},
					createdAt: {
						allowNull: false,
						type: Sequelize.DATE,
					},
					updatedAt: {
						allowNull: false,
						type: Sequelize.DATE,
					},
				},
				transaction
			);
			// admin user cannot enter a category description if the combination of french and english text already exists in the table
			await queryInterface.addConstraint(
				"categories",
				["descriptionEn", "descriptionFr"],
				{
					type: "unique",
					name: "categories_unique_definition",
					transaction,
				}
			);
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable("categories");
	},
};
