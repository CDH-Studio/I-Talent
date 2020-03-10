"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("users", {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal("uuid_generate_v1()")
        },
        name: {
          type: Sequelize.STRING
        },
        email: {
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
        inactive: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }
      })
      .then(() => {
        return queryInterface.createTable("profiles", {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            references: {
              model: "users", // name of Target model
              key: "id" // key in Target model that we're referencing
            },
            defaultValue: Sequelize.literal("uuid_generate_v1()")
          },
          firstName: {
            type: Sequelize.STRING
          },
          lastName: {
            type: Sequelize.STRING
          },
          jobTitleEn: {
            type: Sequelize.STRING
          },
          jobTitleFr: {
            type: Sequelize.STRING
          },
          telephone: {
            type: Sequelize.STRING
          },
          cellphone: {
            type: Sequelize.STRING
          },
          manager: {
            type: Sequelize.STRING
          },
          team: {
            type: Sequelize.STRING
          },
          branchEn: {
            type: Sequelize.STRING
          },
          branchFr: {
            type: Sequelize.STRING
          },
          firstLanguage: {
            type: Sequelize.STRING
          },
          secondLanguage: {
            type: Sequelize.STRING
          },
          yearService: {
            type: Sequelize.INTEGER
          },
          actingStartDate: {
            type: Sequelize.DATE
          },
          actingEndDate: {
            type: Sequelize.DATE
          },
          linkedin: {
            type: Sequelize.STRING
          },
          github: {
            type: Sequelize.STRING
          },
          gcconnex: {
            type: Sequelize.STRING
          },
          exFeeder: {
            type: Sequelize.BOOLEAN
          },
          isMentor: {
            allowNull: true,
            type: Sequelize.BOOLEAN,
            defaultValue: false
          },
          flagged: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
            defaultValue: false
          },
          interestedInRemote: {
            allowNull: true,
            type: Sequelize.BOOLEAN,
            defaultValue: null
          },
          indeterminate: {
            allowNull: true,
            type: Sequelize.BOOLEAN,
            defaultValue: false
          },
          visibleCards: {
            allowNull: false,
            type: Sequelize.JSON,
            defaultValue: {
              info: true,
              manager: true,
              talentManagement: true,
              officialLanguage: true,
              skills: true,
              competencies: true,
              developmentalGoals: true,
              education: true,
              experience: true,
              projects: true,
              careerInterests: true,
              mentorshipSkills: false
            }
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("profiles").then(() => {
      return queryInterface.dropTable("users");
    });
  }
};
