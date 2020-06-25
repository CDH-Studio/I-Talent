const path = require("path");
const { PrismaClient } = require("../../client");
const users = require("./data/users");

const prisma = new PrismaClient();

async function getSecurityClearanceId(description) {
  let securityClearanceId;

  if (description) {
    securityClearanceId = await prisma.opTransSecurityClearance
      .findOne({
        where: {
          language_description: {
            description,
            language: "ENGLISH",
          },
        },
      })
      .then((i) => i.opSecurityClearanceId);
  }
  return securityClearanceId;
}

async function getCareerMobilityId(description) {
  let careerMobilityId;
  if (description) {
    try {
      careerMobilityId = await prisma.opTransCareerMobility
        .findOne({
          where: {
            language_description: {
              description,
              language: "ENGLISH",
            },
          },
        })
        .then((i) => i.opCareerMobilityId);
    } catch (error) {
      console.log(error);
    }
  }
  return careerMobilityId;
}

async function getLookingJobId(description) {
  let lookingJobId;
  if (description) {
    try {
      lookingJobId = await prisma.opTransLookingJob
        .findOne({
          where: {
            language_description: {
              description,
              language: "ENGLISH",
            },
          },
        })
        .then((i) => i.opLookingJobId);
    } catch (error) {
      console.log(error);
    }
  }
  return lookingJobId;
}

async function getTenureId(name) {
  let tenureId;

  if (name) {
    tenureId = await prisma.opTransTenure
      .findOne({
        where: {
          language_name: {
            name,
            language: "ENGLISH",
          },
        },
      })
      .then((i) => i.opTenureId);
  }

  return tenureId;
}

async function getTalentMatrixResultId(description) {
  let talentMatrixResultId;

  if (description) {
    talentMatrixResultId = await prisma.opTransTalentMatrixResult
      .findOne({
        where: {
          language_description: {
            description,
            language: "ENGLISH",
          },
        },
      })
      .then((i) => i.opTalentMatrixResultId);
  }

  return talentMatrixResultId;
}

async function getOfficeLocationId(officeLocation) {
  let officeLocationId;

  if (officeLocation) {
    await prisma.opOfficeLocation
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
      prisma.opTransCompetency
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
      prisma.opTransSkill
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
      prisma.opTransSkill
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
      prisma.opTransCompetency
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
      prisma.opTransSkill
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
          diplomaId: await prisma.opTransDiploma
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
          schoolId: await prisma.opTransSchool
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
        prisma.opOfficeLocation
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
      teams,
      telephone,
      // employmentInfo,
      exFeeder,
      // experiences,
      // organizations,
      // securityClearance,
      careerMobility,
      lookingJob,
      projects,
      preferredLanguage,
      // proficiencies,
      avatarColor,
      // tenure,
      // talentMatrixResult,
      // officeLocation,
      // compentencies,
      // developmentalGoals,
      // mentorshipSkills,
      // skills,
      actingLevel,
      groupLevel,
      actingEndDate,
      actingStartDate,
      // educations,
      // relocationLocations,
    }) => {
      const careerMobilityId = await getCareerMobilityId(careerMobility);
      const lookingJobId = await getLookingJobId(lookingJob);
      // const tenureId = await getTenureId(tenure);
      // const officeLocationId = await getOfficeLocationId(officeLocation);
      // const compentenciesIds = await getCompetenciesIds(compentencies);
      // const skillsIds = await getSkillsIds(skills);
      // const educationIds = await getEducationIds(educations);

      // const developmentalGoalsSkillsIds = await getDevelopmentalGoalsSkillsIds(
      //   developmentalGoals
      // );
      // const developmentalGoalsCompetenciesIds = await getDevelopmentalGoalsCompetenciesIds(
      //   developmentalGoals
      // );
      // const mentorshipSkillsIds = await getMentorshipSkillsIds(
      //   mentorshipSkills
      // );
      // const talentMatrixResultId = await getTalentMatrixResultId(
      //   talentMatrixResult
      // );
      // const securityClearanceId = await getSecurityClearanceId(
      //   securityClearance
      // );
      // const relocationLocationIds = await getRelocationLocationIds(
      //   relocationLocations
      // );

      await prisma.user.create({
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
          telephone,
          exFeeder,
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
          projects: {
            set: projects,
          },
          teams: {
            set: teams,
          },
          securityClearance: undefined,
          employmentInfo: undefined,
          experiences: undefined,
          organizations: undefined,
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
          tenure: undefined,
          talentMatrixResult: undefined,
          officeLocation: undefined,
          secondLangProfs: undefined,
          competencies: undefined,
          skills: undefined,
          mentorshipSkills: undefined,
          developmentalGoals: undefined,
          relocationLocations: undefined,
          educations: undefined,
          visibleCards: {
            create: {},
          },
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

  const dbSeed = await prisma.dbSeed.findOne({
    where: { id: folderName },
  });

  if (!dbSeed) {
    console.log(`---- Starting seeding: ${folderName} ----`);
    await seedUsers();
    await prisma.dbSeed.create({
      data: {
        id: folderName,
      },
    });
    console.log(`---- Finished seeding: ${folderName} ----\n`);
  }
}

module.exports = seed;
