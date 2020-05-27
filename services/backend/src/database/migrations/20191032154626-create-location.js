module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("locations", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.literal("uuid_generate_v1()"),
			},
			addressEn: {
				type: Sequelize.STRING,
			},
			addressFr: {
				type: Sequelize.STRING,
			},
			city: {
				type: Sequelize.STRING,
			},
			provinceEn: {
				type: Sequelize.STRING,
			},
			provinceFr: {
				type: Sequelize.STRING,
			},
			postalCode: {
				type: Sequelize.STRING,
			},
			country: {
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
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable("locations");
	},
};
