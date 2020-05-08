module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("experiences", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v1()"),
      },
      organization: {
        type: Sequelize.STRING,
      },
      jobTitle: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
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
    return queryInterface.dropTable("experiences");
  },
};
