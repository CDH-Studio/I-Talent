"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("profileSkills", {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        profileId: {
          type: Sequelize.UUID,
          primaryKey: true,
          references: {
            model: "profiles", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        },
        skillId: {
          type: Sequelize.UUID,
          primaryKey: true,
          references: {
            model: "skills", // name of Target model
            key: "id" // key in Target model that we're referencing
          }
        }
      })
      .then(() => {
        return queryInterface
          .createTable("profileCompetencies", {
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            profileId: {
              type: Sequelize.UUID,
              primaryKey: true,
              references: {
                model: "profiles", // name of Target model
                key: "id" // key in Target model that we're referencing
              },
              onUpdate: "CASCADE",
              onDelete: "CASCADE"
            },
            skillId: {
              type: Sequelize.UUID,
              primaryKey: true,
              references: {
                model: "skills", // name of Target model
                key: "id" // key in Target model that we're referencing
              }
            }
          })
          .then(() => {
            return queryInterface.createTable("profileDevelopmentGoals", {
              createdAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              profileId: {
                type: Sequelize.UUID,
                primaryKey: true,
                references: {
                  model: "profiles", // name of Target model
                  key: "id" // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
              },
              skillId: {
                type: Sequelize.UUID,
                primaryKey: true,
                references: {
                  model: "skills", // name of Target model
                  key: "id" // key in Target model that we're referencing
                }
              }
            });
          })
          .then(() => {
            return queryInterface.createTable("profileMentorshipSkills", {
              createdAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              profileId: {
                type: Sequelize.UUID,
                primaryKey: true,
                references: {
                  model: "profiles", // name of Target model
                  key: "id" // key in Target model that we're referencing
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
              },
              skillId: {
                type: Sequelize.UUID,
                primaryKey: true,
                references: {
                  model: "skills", // name of Target model
                  key: "id" // key in Target model that we're referencing
                }
              }
            });
          });
      });
  },

  down: (queryInterface, Sequelize) => {
    // remove table
    return queryInterface.dropTable("profileSkills").then(() => {
      return queryInterface.dropTable("profileCompetencies").then(() => {
        return queryInterface.dropTable("profileDevelopmentGoals").then(() => {
          return queryInterface.dropTable("profileMentorshipSkills");
        });
      });
    });
  }
};