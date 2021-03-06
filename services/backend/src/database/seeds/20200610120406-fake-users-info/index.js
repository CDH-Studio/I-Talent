const path = require("path");
const prisma = require("../..");
const users = require("./data/users");
const config = require("../../../config");

async function getSecurityClearanceId(description) {
  let securityClearanceId;

  if (description) {
    securityClearanceId = await prisma.opTransSecurityClearance
      .findUnique({
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
        .findUnique({
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
        .findUnique({
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
      .findUnique({
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
      .findUnique({
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
        .findUnique({
          where: {
            language_name: {
              name,
              language: "ENGLISH",
            },
          },
        })
        .then((i) => i.opCompetencyId)
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
        .findUnique({
          where: {
            language_name: {
              name,
              language: "ENGLISH",
            },
          },
        })
        .then((i) => i.opSkillId)
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
        .findUnique({
          where: {
            language_name: {
              name,
              language: "ENGLISH",
            },
          },
        })
        .then((i) => (i ? i.opSkillId : undefined))
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
        .findUnique({
          where: {
            language_name: {
              name,
              language: "ENGLISH",
            },
          },
        })
        .then((i) => (i ? i.opCompetencyId : undefined))
    );

    developmentalGoalsCompetenciesIds = await Promise.all(promises);
    developmentalGoalsCompetenciesIds =
      developmentalGoalsCompetenciesIds.filter((i) => i !== undefined); // Removes the null entries in the array from the skills
  }

  return developmentalGoalsCompetenciesIds;
}

async function getMentorshipSkillsIds(mentorshipSkills) {
  let mentorshipSkillsIds = [];

  if (mentorshipSkills) {
    const promises = mentorshipSkills.map(async (name) =>
      prisma.opTransSkill
        .findUnique({
          where: {
            language_name: {
              name,
              language: "ENGLISH",
            },
          },
        })
        .then((i) => i.opSkillId)
    );

    mentorshipSkillsIds = await Promise.all(promises);
  }

  return mentorshipSkillsIds;
}

async function getEducationIds(educations) {
  let educationIds = [];

  if (educations) {
    const promises = educations.map(
      async ({ diploma, school, startDate, endDate }) => ({
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
              return i[0].opDiplomaId;
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
              return i[0].opSchoolId;
            }
            return undefined;
          }),
      })
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
      pri,
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
      employmentInfo,
      exFeeder,
      experiences,
      organizations,
      securityClearance,
      careerMobility,
      lookingJob,
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
      educations,
      relocationLocations,
      visibleCards,
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
      const developmentalGoalsCompetenciesIds =
        await getDevelopmentalGoalsCompetenciesIds(developmentalGoals);
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

      await prisma.user.create({
        data: {
          name,
          email,
          cellphone,
          pri,
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
          visibleCards: visibleCards
            ? {
                create: {
                  info: visibleCards.info,
                  talentManagement: visibleCards.talentManagement,
                  officialLanguage: visibleCards.officialLanguage,
                  skills: visibleCards.skills,
                  competencies: visibleCards.competencies,
                  developmentalGoals: visibleCards.developmentalGoals,
                  education: visibleCards.education,
                  experience: visibleCards.experience,
                  careerInterests: visibleCards.careerInterests,
                  mentorshipSkills: visibleCards.mentorshipSkills,
                  exFeeder: visibleCards.exFeeder,
                },
              }
            : undefined,
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
          teams: {
            set: teams,
          },
          securityClearance: securityClearanceId
            ? {
                connect: {
                  id: securityClearanceId,
                },
              }
            : undefined,
          employmentInfo: {
            create: {
              translations: {
                create: Object.keys(employmentInfo).map((i) => ({
                  jobTitle: employmentInfo[i].jobTitle,
                  branch: employmentInfo[i].branch,
                  language: i === "en" ? "ENGLISH" : "FRENCH",
                })),
              },
            },
          },
          experiences: {
            create: experiences.map(
              ({ endDate, startDate, translations, projects }) => ({
                endDate,
                startDate,
                projects: projects
                  ? {
                      set: projects,
                    }
                  : undefined,
                translations: {
                  create: Object.keys(translations).map((i) => ({
                    description: translations[i].description,
                    jobTitle: translations[i].jobTitle,
                    organization: translations[i].organization,
                    language: i === "en" ? "ENGLISH" : "FRENCH",
                  })),
                },
              })
            ),
          },
          organizations: organizations
            ? {
                create: {
                  organizationTier: {
                    create: organizations.map(({ tier, en, fr }) => ({
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
                    })),
                  },
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
          secondLangProfs: {
            create: proficiencies.map(({ status, level, proficiency }) => ({
              status,
              level,
              proficiency,
            })),
          },
          competencies: {
            create: compentenciesIds.map((id) => ({
              competency: {
                connect: {
                  id,
                },
              },
            })),
          },
          skills: {
            create: skillsIds.map((id) => ({
              skill: {
                connect: {
                  id,
                },
              },
            })),
          },
          mentorshipSkills: {
            create: mentorshipSkillsIds.map((id) => ({
              skill: {
                connect: {
                  id,
                },
              },
            })),
          },
          developmentalGoals: {
            create: [
              ...developmentalGoalsCompetenciesIds.map((id) => ({
                competency: {
                  connect: {
                    id,
                  },
                },
              })),
              ...developmentalGoalsSkillsIds.map((id) => ({
                skill: {
                  connect: {
                    id,
                  },
                },
              })),
            ],
          },
          relocationLocations: {
            create: relocationLocationIds.map((id) => ({
              location: {
                connect: {
                  id,
                },
              },
            })),
          },
          educations: {
            create: educationIds.map(
              ({ diplomaId, schoolId, startDate, endDate }) => ({
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
              })
            ),
          },
        },
      });
    }
  );
  return Promise.all(setupUsers);
}

async function seed() {
  if (config.ENV === "production") {
    return;
  }

  const folderName = path.dirname(__filename).split(path.sep).pop();

  const dbSeed = await prisma.dbSeed.findUnique({
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

  await prisma.$disconnect();
}

module.exports = seed;
