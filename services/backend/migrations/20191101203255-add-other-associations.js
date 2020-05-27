"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        "profileProjects", // name of Source model
        "profileId", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "profiles", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      )
      .then(() => {
        return queryInterface
          .addColumn(
            "experiences", // name of Source model
            "profileId", // name of the key we're adding
            {
              type: Sequelize.UUID,
              references: {
                model: "profiles", // name of Target model
                key: "id" // key in Target model that we're referencing
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL"
            }
          )
          .then(() => {
            return queryInterface
              .addColumn(
                "profileOrganizations", // name of Source model
                "profileId", // name of the key we're adding
                {
                  type: Sequelize.UUID,
                  references: {
                    model: "profiles", // name of Target model
                    key: "id" // key in Target model that we're referencing
                  },
                  onUpdate: "CASCADE",
                  onDelete: "SET NULL"
                }
              )
              .then(() => {
                return queryInterface
                  .addColumn(
                    "relocationLocations", // name of Source model
                    "profileId", // name of the key we're adding
                    {
                      type: Sequelize.UUID,
                      references: {
                        model: "profiles", // name of Target model
                        key: "id" // key in Target model that we're referencing
                      },
                      onUpdate: "CASCADE",
                      onDelete: "SET NULL"
                    }
                  )
                  .then(() => {
                    return queryInterface.addColumn(
                      "relocationLocations", // name of Source model
                      "locationId", // name of the key we're adding
                      {
                        type: Sequelize.UUID,
                        references: {
                          model: "locations", // name of Target model
                          key: "id" // key in Target model that we're referencing
                        },
                        onUpdate: "CASCADE",
                        onDelete: "SET NULL"
                      }
                    );
                  });
              });
          });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        "profileProjects", // name of Source model
        "profileId" // key we want to remove
      )
      .then(() => {
        return queryInterface
          .removeColumn(
            "experiences", // name of Source model
            "profileId" // key we want to remove
          )
          .then(() => {
            return queryInterface.removeColumn(
              "profileOrganizations", // name of Source model
              "profileId" // key we want to remove
            );
          })
          .then(() => {
            return queryInterface.removeColumn(
              "relocationLocations", // name of Source model
              "profileId" // key we want to remove
            );
          })
          .then(() => {
            return queryInterface.removeColumn(
              "relocationLocations", // name of Source model
              "locationId" // key we want to remove
            );
          });
      });
  }
};
