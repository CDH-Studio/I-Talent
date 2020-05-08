module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("profileOrganizations", {
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
      tier: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable("profileOrganizations");
  },
};
