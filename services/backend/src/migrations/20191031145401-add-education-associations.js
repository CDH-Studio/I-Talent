"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        "education", // name of Source model
        "profileId", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "profiles", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        }
      )
      .then(() => {
        return queryInterface
          .addColumn(
            "education", // name of Source model
            "schoolId", // name of the key we're adding
            {
              type: Sequelize.UUID,
              references: {
                model: "schools", // name of Target model
                key: "id" // key in Target model that we're referencing
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL"
            }
          )
          .then(() => {
            return queryInterface.addColumn(
              "education", // name of Source model
              "diplomaId", // name of the key we're adding
              {
                type: Sequelize.UUID,
                references: {
                  model: "diplomas", // name of Target model
                  key: "id" // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL"
              }
            );
          });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        "education", // name of Source model
        "profileId" // key we want to remove
      )
      .then(() => {
        return queryInterface
          .removeColumn(
            "education", // name of Source model
            "schoolId" // key we want to remove
          )
          .then(() => {
            return queryInterface.removeColumn(
              "education", // name of Source model
              "diplomaId" // key we want to remove
            );
          });
      });
  }
};
