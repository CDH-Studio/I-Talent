"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("skills", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v1()")
      },
      descriptionEn: {
        type: Sequelize.STRING
      },
      descriptionFr: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      categoryId:{ // addition of category foreign key
        type: Sequelize.INTEGER,
        allowNull: false, // a skill must belong to a category
        references:{
          model: "categories",
          key: "id"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("skills");
  }
};
