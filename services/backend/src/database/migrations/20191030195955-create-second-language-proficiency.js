module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("secondLanguageProficiencies", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.literal("uuid_generate_v1()"),
			},
			readingProficiency: {
				type: Sequelize.STRING,
			},
			writingProficiency: {
				type: Sequelize.STRING,
			},
			oralProficiency: {
				type: Sequelize.STRING,
			},
			readingDate: {
				type: Sequelize.DATE,
			},
			writingDate: {
				type: Sequelize.DATE,
			},
			oralDate: {
				type: Sequelize.DATE,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable("secondLanguageProficiencies");
	},
};
