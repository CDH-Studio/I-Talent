"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        "profiles", // name of Source model
        "tenureId", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "tenures", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      )
      .then(() => {
        return queryInterface
          .addColumn(
            "profiles", // name of Source model
            "groupLevelId", // name of the key we're adding
            {
              type: Sequelize.UUID,
              references: {
                model: "groupLevels", // name of Target model
                key: "id" // key in Target model that we're referencing
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL"
            }
          )
          .then(() => {
            return queryInterface
              .addColumn(
                "profiles", // name of Source model
                "actingId", // name of the key we're adding
                {
                  type: Sequelize.UUID,
                  references: {
                    model: "groupLevels", // name of Target model
                    key: "id" // key in Target model that we're referencing
                  },
                  onUpdate: "CASCADE",
                  onDelete: "SET NULL"
                }
              )
              .then(() => {
                return queryInterface
                  .addColumn(
                    "profiles", // name of Source model
                    "securityClearanceId", // name of the key we're adding
                    {
                      type: Sequelize.UUID,
                      references: {
                        model: "securityClearances", // name of Target model
                        key: "id" // key in Target model that we're referencing
                      },
                      onUpdate: "CASCADE",
                      onDelete: "SET NULL"
                    }
                  )
                  .then(() => {
                    return queryInterface.addColumn(
                      "profiles", // name of Source model
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
                  })
                  .then(() => {
                    return queryInterface
                      .addColumn(
                        "profiles", // name of Source model
                        "careerMobilityId", // name of the key we're adding
                        {
                          type: Sequelize.UUID,
                          references: {
                            model: "careerMobilities", // name of Target model
                            key: "id" // key in Target model that we're referencing
                          },
                          onUpdate: "CASCADE",
                          onDelete: "SET NULL"
                        }
                      )
                      .then(() => {
                        return queryInterface
                          .addColumn(
                            "profiles", // name of Source model
                            "talentMatrixResultId", // name of the key we're adding
                            {
                              type: Sequelize.UUID,
                              references: {
                                model: "talentMatrixResults", // name of Target model
                                key: "id" // key in Target model that we're referencing
                              },
                              onUpdate: "CASCADE",
                              onDelete: "SET NULL"
                            }
                          )
                          .then(() => {
                            return queryInterface
                              .addColumn(
                                "profiles", // name of Source model
                                "keyCompetencyId", // name of the key we're adding
                                {
                                  type: Sequelize.UUID,
                                  references: {
                                    model: "keyCompetencies", // name of Target model
                                    key: "id" // key in Target model that we're referencing
                                  },
                                  onUpdate: "CASCADE",
                                  onDelete: "SET NULL"
                                }
                              )
                              .then(() => {
                                return queryInterface
                                  .addColumn(
                                    "profiles", // name of Source model
                                    "secondLanguageProficiencyId", // name of the key we're adding
                                    {
                                      type: Sequelize.UUID,
                                      references: {
                                        model: "secondLanguageProficiencies", // name of Target model
                                        key: "id" // key in Target model that we're referencing
                                      },
                                      onUpdate: "CASCADE",
                                      onDelete: "SET NULL"
                                    }
                                  )
                                  .then(() => {
                                    return queryInterface.addColumn(
                                      "profiles", // name of Source model
                                      "lookingForANewJobId", // name of the key we're adding
                                      {
                                        type: Sequelize.UUID,
                                        references: {
                                          model: "lookingForANewJobs", // name of Target model
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
                  });
              });
          });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        "profiles", // name of Source model
        "tenureId" // key we want to remove
      )
      .then(() => {
        return queryInterface
          .removeColumn(
            "profiles", // name of Source model
            "groupLevelId" // key we want to remove
          )
          .then(() => {
            return queryInterface
              .removeColumn(
                "profiles", // name of Source model
                "actingId" // key we want to remove
              )
              .then(() => {
                return queryInterface
                  .removeColumn(
                    "profiles", // name of Source model
                    "securityClearanceId" // key we want to remove
                  )
                  .then(() => {
                    return queryInterface
                      .removeColumn(
                        "profiles", // name of Source model
                        "locationId" // key we want to remove
                      )
                      .then(() => {
                        return queryInterface
                          .removeColumn(
                            "profiles", // name of Source model
                            "careerMobilityId" // key we want to remove
                          )
                          .then(() => {
                            return queryInterface
                              .removeColumn(
                                "profiles", // name of Source model
                                "talentMatrixResultId" // key we want to remove
                              )
                              .then(() => {
                                return queryInterface
                                  .removeColumn(
                                    "profiles", // name of Source model
                                    "keyCompetencyId" // key we want to remove
                                  )
                                  .then(() => {
                                    return queryInterface
                                      .removeColumn(
                                        "profiles", // name of Source model
                                        "secondLanguageProficiencyId" // key we want to remove
                                      )
                                      .then(() => {
                                        return queryInterface.removeColumn(
                                          "profiles", // name of Source model
                                          "lookingForANewJobId" // key we want to remove
                                        );
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  }
};
/*



*/
