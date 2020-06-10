const path = require("path");
const { PrismaClient } = require("../../client");
const users = require("./data/users");

const prisma = new PrismaClient();

async function getSecurityClearanceId(description) {
  let securityClearanceId;

  if (description) {
    securityClearanceId = await prisma.opTransSecurityClearances
      .findOne({
        where: {
          language_description: {
            description,
            language: "ENGLISH",
          },
        },
      })
      .then((i) => i.opSecurityClearancesId);
  }

  return securityClearanceId;
}

async function getCareerMobilityId(description) {
  let careerMobilityId;

  if (description) {
    careerMobilityId = await prisma.opTransCareerMobilities
      .findOne({
        where: {
          language_description: {
            description,
            language: "ENGLISH",
          },
        },
      })
      .then((i) => i.opCareerMobilitiesId);
  }

  return careerMobilityId;
}

async function getLookingJobId(description) {
  let lookingJobId;

  if (description) {
    lookingJobId = await prisma.opTransLookingJobs
      .findOne({
        where: {
          language_description: {
            description,
            language: "ENGLISH",
          },
        },
      })
      .then((i) => i.opLookingJobsId);
  }

  return lookingJobId;
}

async function getTenureId(name) {
  let tenureId;

  if (name) {
    tenureId = await prisma.opTransTenures
      .findOne({
        where: {
          language_name: {
            name,
            language: "ENGLISH",
          },
        },
      })
      .then((i) => i.opTenuresId);
  }

  return tenureId;
}

async function getTalentMatrixResultId(description) {
  let talentMatrixResultId;

  if (description) {
    talentMatrixResultId = await prisma.opTransTalentMatrixResults
      .findOne({
        where: {
          language_description: {
            description,
            language: "ENGLISH",
          },
        },
      })
      .then((i) => i.opTalentMatrixResultsId);
  }

  return talentMatrixResultId;
}

async function getOfficeLocationId(officeLocation) {
  let officeLocationId;

  if (officeLocation) {
    await prisma.opOfficeLocations
      .findMany({
        where: {
          city: officeLocation.city,
          country: officeLocation.country,
          streetNumber: officeLocation.streetNumber,
          postalCode: officeLocation.postalCode,
        },
      })
      .then((i) => {
        if (i[0]) {
          officeLocationId = i[0].id;
        }
      });
  }

  return officeLocationId;
}

async function getCompetenciesIds(compentencies) {
  let compentenciesIds = [];

  if (compentencies) {
    const promises = compentencies.map(async (name) =>
      prisma.opTransCompetencies
        .findOne({
          where: {
            language_name: {
              name,
              language: "ENGLISH",
            },
          },
        })
        .then((i) => i.opCompetenciesId)
    );

    compentenciesIds = await Promise.all(promises);
  }

  return compentenciesIds;
}

async function getSkillsIds(skills) {
  let skillsIds = [];

  if (skills) {
    const promises = skills.map(async (name) =>
      prisma.opTransSkills
        .findOne({
          where: {
            language_name: {
              name,
              language: "ENGLISH",
            },
          },
        })
        .then((i) => i.opSkillsId)
    );

    skillsIds = await Promise.all(promises);
  }

  return skillsIds;
}

async function getDevelopmentalGoalsSkillsIds(developmentalGoals) {
  let developmentalGoalsSkillsIds = [];

  if (developmentalGoalsSkillsIds) {
    const promises = developmentalGoals.map(async (name) =>
      prisma.opTransSkills
        .findOne({
          where: {
            language_name: {
              name,
              language: "ENGLISH",
            },
          },
        })
        .then((i) => (i ? i.opSkillsId : undefined))
    );

    developmentalGoalsSkillsIds = await Promise.all(promises);
    developmentalGoalsSkillsIds = developmentalGoalsSkillsIds.filter(
      (i) => i !== undefined
    ); // Removes the null entries in the array from the competencies
  }

  return developmentalGoalsSkillsIds;
}

async function getDevelopmentalGoalsCompetenciesIds(developmentalGoals) {
  let developmentalGoalsCompetenciesIds = [];

  if (developmentalGoalsCompetenciesIds) {
    const promises = developmentalGoals.map(async (name) =>
      prisma.opTransCompetencies
        .findOne({
          where: {
            language_name: {
              name,
              language: "ENGLISH",
            },
          },
        })
        .then((i) => (i ? i.opCompetenciesId : undefined))
    );

    developmentalGoalsCompetenciesIds = await Promise.all(promises);
    developmentalGoalsCompetenciesIds = developmentalGoalsCompetenciesIds.filter(
      (i) => i !== undefined
    ); // Removes the null entries in the array from the skills
  }

  return developmentalGoalsCompetenciesIds;
}

async function getMentorshipSkillsIds(mentorshipSkills) {
  let mentorshipSkillsIds = [];

  if (mentorshipSkills) {
    const promises = mentorshipSkills.map(async (name) =>
      prisma.opTransSkills
        .findOne({
          where: {
            language_name: {
              name,
              language: "ENGLISH",
            },
          },
        })
        .then((i) => i.opSkillsId)
    );

    mentorshipSkillsIds = await Promise.all(promises);
  }

  return mentorshipSkillsIds;
}

async function getEducationIds(educations) {
  let educationIds = [];

  if (educations) {
    const promises = educations.map(
      async ({ diploma, school, startDate, endDate }) => {
        return {
          startDate,
          endDate,
          diplomaId: await prisma.opTransDiplomas
            .findMany({
              where: {
                description: diploma,
                language: "ENGLISH",
              },
            })
            .then((i) => {
              if (i[0]) {
                return i[0].opDiplomasId;
              }
              return undefined;
            }),
          schoolId: await prisma.opTransSchools
            .findMany({
              where: {
                name: school,
                language: "ENGLISH",
              },
            })
            .then((i) => {
              if (i[0]) {
                return i[0].opSchoolsId;
              }
              return undefined;
            }),
        };
      }
    );

    educationIds = await Promise.all(promises);
  }

  return educationIds;
}

async function getRelocationLocationIds(relocationLocations) {
  let relocationLocationIds = [];

  if (relocationLocations) {
    const promises = relocationLocations.map(
      async ({ city, country, streetNumber, postalCode }) =>
        prisma.opOfficeLocations
          .findMany({
            where: {
              city,
              country,
              streetNumber,
              postalCode,
            },
          })
          .then((i) => {
            if (i[0]) {
              return i[0].id;
            }
            return undefined;
          })
    );

    relocationLocationIds = await Promise.all(promises);
    relocationLocationIds = relocationLocationIds.filter(
      (i) => i !== undefined
    ); // Removes the null entries in the array
  }

  return relocationLocationIds;
}

async function seedUsers() {
  const setupUsers = users.map(
    async ({
      name,
      email,
      cellphone,
      firstLanguage,
      firstName,
      github,
      gcconnex,
      interestedInRemote,
      lastName,
      linkedin,
      manager,
      secondLanguage,
      team,
      telephone,
      employmentInfo,
      exFeeder,
      mentoring,
      experiences,
      nameInitials,
      organizations,
      securityClearance,
      careerMobility,
      lookingJob,
      projects,
      preferredLanguage,
      proficiencies,
      avatarColor,
      tenure,
      talentMatrixResult,
      officeLocation,
      compentencies,
      developmentalGoals,
      mentorshipSkills,
      skills,
      actingLevel,
      groupLevel,
      actingEndDate,
      actingStartDate,
      educations,
      relocationLocations,
    }) => {
      const careerMobilityId = await getCareerMobilityId(careerMobility);
      const lookingJobId = await getLookingJobId(lookingJob);
      const tenureId = await getTenureId(tenure);
      const officeLocationId = await getOfficeLocationId(officeLocation);
      const compentenciesIds = await getCompetenciesIds(compentencies);
      const skillsIds = await getSkillsIds(skills);
      const educationIds = await getEducationIds(educations);

      const developmentalGoalsSkillsIds = await getDevelopmentalGoalsSkillsIds(
        developmentalGoals
      );
      const developmentalGoalsCompetenciesIds = await getDevelopmentalGoalsCompetenciesIds(
        developmentalGoals
      );
      const mentorshipSkillsIds = await getMentorshipSkillsIds(
        mentorshipSkills
      );
      const talentMatrixResultId = await getTalentMatrixResultId(
        talentMatrixResult
      );
      const securityClearanceId = await getSecurityClearanceId(
        securityClearance
      );
      const relocationLocationIds = await getRelocationLocationIds(
        relocationLocations
      );

      await prisma.users.create({
        data: {
          name,
          email,
          cellphone,
          firstLanguage,
          firstName,
          github,
          gcconnex,
          interestedInRemote,
          lastName,
          linkedin,
          manager,
          secondLanguage,
          team,
          telephone,
          nameInitials,
          exFeeder,
          mentoring,
          preferredLanguage,
          avatarColor,
          actingEndDate,
          actingStartDate,
          actingLevel: actingLevel
            ? {
                connect: {
                  name: actingLevel,
                },
              }
            : undefined,
          groupLevel: groupLevel
            ? {
                connect: {
                  name: groupLevel,
                },
              }
            : undefined,
          employmentInfo: {
            create: {
              translations: {
                create: Object.keys(employmentInfo).map((i) => {
                  return {
                    jobTitle: employmentInfo[i].jobTitle,
                    branch: employmentInfo[i].branch,
                    language: i === "en" ? "ENGLISH" : "FRENCH",
                  };
                }),
              },
            },
          },
          experiences: {
            create: experiences.map(({ endDate, startDate, translations }) => {
              return {
                endDate,
                startDate,
                translations: {
                  create: Object.keys(translations).map((i) => {
                    return {
                      description: translations[i].description,
                      jobTitle: translations[i].jobTitle,
                      organization: translations[i].organization,
                      language: i === "en" ? "ENGLISH" : "FRENCH",
                    };
                  }),
                },
              };
            }),
          },
          organizations: organizations
            ? {
                create: organizations.map(({ tier, en, fr }) => {
                  return {
                    tier,
                    translations: {
                      create: [
                        {
                          description: en,
                          language: "ENGLISH",
                        },
                        {
                          description: fr,
                          language: "FRENCH",
                        },
                      ],
                    },
                  };
                }),
              }
            : undefined,
          securityClearance: securityClearanceId
            ? {
                connect: {
                  id: securityClearanceId,
                },
              }
            : undefined,
          careerMobility: careerMobilityId
            ? {
                connect: {
                  id: careerMobilityId,
                },
              }
            : undefined,
          lookingJob: lookingJobId
            ? {
                connect: {
                  id: lookingJobId,
                },
              }
            : undefined,
          tenure: tenureId
            ? {
                connect: {
                  id: tenureId,
                },
              }
            : undefined,
          talentMatrixResult: talentMatrixResultId
            ? {
                connect: {
                  id: talentMatrixResultId,
                },
              }
            : undefined,
          officeLocation: officeLocationId
            ? {
                connect: {
                  id: officeLocationId,
                },
              }
            : undefined,
          projects: {
            set: projects,
          },
          secondLangProfs: {
            create: proficiencies.map(({ date, level, proficiency }) => {
              return {
                date,
                level,
                proficiency,
              };
            }),
          },
          competencies: {
            create: compentenciesIds.map((id) => {
              return {
                competency: {
                  connect: {
                    id,
                  },
                },
              };
            }),
          },
          skills: {
            create: skillsIds.map((id) => {
              return {
                skill: {
                  connect: {
                    id,
                  },
                },
              };
            }),
          },
          mentorshipSkills: {
            create: mentorshipSkillsIds.map((id) => {
              return {
                skill: {
                  connect: {
                    id,
                  },
                },
              };
            }),
          },
          developmentalGoals: {
            create: [
              ...developmentalGoalsCompetenciesIds.map((id) => {
                return {
                  competency: {
                    connect: {
                      id,
                    },
                  },
                };
              }),
              ...developmentalGoalsSkillsIds.map((id) => {
                return {
                  skill: {
                    connect: {
                      id,
                    },
                  },
                };
              }),
            ],
          },
          relocationLocations: {
            create: relocationLocationIds.map((id) => {
              return {
                location: {
                  connect: {
                    id,
                  },
                },
              };
            }),
          },
          educations: {
            create: educationIds.map(
              ({ diplomaId, schoolId, startDate, endDate }) => {
                return {
                  startDate,
                  endDate,
                  diploma: {
                    connect: {
                      id: diplomaId,
                    },
                  },
                  school: {
                    connect: {
                      id: schoolId,
                    },
                  },
                };
              }
            ),
          },
          visibleCards: {
            create: {}
          }
        },
      });
    }
  );
  return Promise.all(setupUsers);
}

async function seed() {
  if (process.env.NODE_ENV === "production") {
    process.exit(0);
  }

  const folderName = path.dirname(__filename).split(path.sep).pop();

  const dbSeed = await prisma.dbSeeds.findOne({
    where: { id: folderName },
  });

  if (!dbSeed) {
    console.log(`---- Starting seeding: ${folderName} ----`);
    await seedUsers();
    await prisma.dbSeeds.create({
      data: {
        id: folderName,
      },
    });
    console.log(`---- Finished seeding: ${folderName} ----\n`);
  }
}

module.exports = seed;
