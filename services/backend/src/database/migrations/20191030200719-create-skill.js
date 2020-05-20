module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction(async (transaction) => {
			await queryInterface.createTable(
				"skills",
				{
					id: {
						allowNull: false,
						primaryKey: true,
						type: Sequelize.UUID,
						defaultValue: Sequelize.literal("uuid_generate_v1()"),
					},
					descriptionEn: {
						type: Sequelize.STRING,
					},
					descriptionFr: {
						type: Sequelize.STRING,
					},
					type: {
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
					categoryId: {
						// addition of category foreign key
						type: Sequelize.INTEGER,
						allowNull: false, // a skill must belong to a category
						references: {
							model: "categories",
							key: "id",
						},
					},
				},
				transaction
			);
			// admin user cannot enter a skill description if the combination of french and english text already exists in the table
			await queryInterface.addConstraint(
				"skills",
				["descriptionEn", "descriptionFr"],
				{
					type: "unique",
					name: "skills_unique_definition",
					transaction,
				}
			);
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable("skills");
	},
};
