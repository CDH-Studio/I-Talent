const { PrismaClient } = require("@prisma/client");
const {
  lookingForANewJobs,
  tenures,
  securityClearances,
  careerMobilities,
  talentMatrixResults,
  keyCompetencies,
  groupLevels,
  diplomas,
  schools,
  categories,
  skills,
  locations,
  competencies,
  users,
  profiles,
  experiences,
  profileOrganizations,
} = require("./data");

const prisma = new PrismaClient();

async function seedStaticInfo() {
  const staticInfo = [
    ...lookingForANewJobs.map(async ({ descriptionEn, descriptionFr }) => {
      await prisma.lookingForANewJobs.create({
        data: {
          descriptionEn,
          descriptionFr,
        },
      });
    }),

    ...tenures.map(async ({ descriptionEn, descriptionFr }) => {
      await prisma.tenures.create({
        data: {
          descriptionEn,
          descriptionFr,
        },
      });
    }),

    ...securityClearances.map(async ({ descriptionEn, descriptionFr }) => {
      await prisma.securityClearances.create({
        data: {
          descriptionEn,
          descriptionFr,
        },
      });
    }),

    ...careerMobilities.map(async ({ descriptionEn, descriptionFr }) => {
      await prisma.careerMobilities.create({
        data: {
          descriptionEn,
          descriptionFr,
        },
      });
    }),

    ...talentMatrixResults.map(async ({ descriptionEn, descriptionFr }) => {
      await prisma.talentMatrixResults.create({
        data: {
          descriptionEn,
          descriptionFr,
        },
      });
    }),

    ...keyCompetencies.map(async ({ descriptionEn, descriptionFr }) => {
      await prisma.keyCompetencies.create({
        data: {
          descriptionEn,
          descriptionFr,
        },
      });
    }),

    ...groupLevels.map(async (description) => {
      await prisma.groupLevels.create({
        data: {
          description,
        },
      });
    }),

    ...diplomas.map(async ({ descriptionEn, descriptionFr }) => {
      await prisma.diplomas.create({
        data: {
          descriptionEn,
          descriptionFr,
        },
      });
    }),

    ...schools.map(async ({ state, country, description }) => {
      await prisma.schools.create({
        data: {
          state,
          country,
          description,
        },
      });
    }),

    ...categories.map(async ({ descriptionEn, descriptionFr }) => {
      await prisma.categories.create({
        data: {
          descriptionEn,
          descriptionFr,
        },
      });
    }),

    ...locations.map(async (i) => {
      await prisma.locations.create({
        data: {
          addressEn: i.addressEn,
          addressFr: i.addressFr,
          city: i.city,
          provinceEn: i.provinceEn,
          provinceFr: i.provinceFr,
          country: i.country,
          postalCode: i.postalCode,
        },
      });
    }),

    ...competencies.map(async ({ descriptionEn, descriptionFr }) => {
      await prisma.competencies.create({
        data: {
          descriptionEn,
          descriptionFr,
        },
      });
    }),
  ];

  return Promise.all(staticInfo);
}

async function seedSkills() {
  const setupSkills = skills.map(
    async ({ descriptionEn, descriptionFr, type, categoryId }) => {
      await prisma.skills.create({
        data: {
          descriptionEn,
          descriptionFr,
          type,
          categories: {
            connect: {
              id: categoryId,
            },
          },
        },
      });
    }
  );
  return Promise.all(setupSkills);
}

async function seedUsers() {
  const setupUsers = users.map(async ({ id, name, email }) => {
    await prisma.users.create({
      data: {
        id,
        name,
        email,
      },
    });
  });
  return Promise.all(setupUsers);
}

async function seedProfiles() {
  const setupProfiles = profiles.map(
    async ({
      id,
      firstName,
      lastName,
      jobTitleEn,
      jobTitleFr,
      telephone,
      cellphone,
      manager,
      team,
      firstLanguage,
      secondLanguage,
      linkedin,
      github,
      interestedInRemote,
      indeterminate,
    }) => {
      await prisma.profiles.create({
        data: {
          firstName,
          lastName,
          jobTitleEn,
          jobTitleFr,
          telephone,
          cellphone,
          manager,
          team,
          firstLanguage,
          secondLanguage,
          linkedin,
          github,
          interestedInRemote,
          indeterminate,
          users: {
            connect: {
              id,
            },
          },
          visibleCards: {
            create: {},
          },
        },
      });
    }
  );
  return Promise.all(setupProfiles);
}

async function seedUserInfo() {
  const infoUsers = [
    ...experiences.map(
      async ({
        description,
        endDate,
        jobTitle,
        organization,
        profileId,
        startDate,
      }) => {
        await prisma.experiences.create({
          data: {
            description,
            endDate,
            jobTitle,
            organization,
            startDate,
            profiles: {
              connect: {
                id: profileId,
              },
            },
          },
        });
      }
    ),

    ...profileOrganizations.map(
      async ({ descriptionEn, descriptionFr, tier, profileId }) => {
        await prisma.profileOrganizations.create({
          data: {
            descriptionEn,
            descriptionFr,
            tier,
            profiles: {
              connect: {
                id: profileId,
              },
            },
          },
        });
      }
    ),
  ];
  return Promise.all(infoUsers);
}

async function seed() {
  // Checks if there's some entries in the database to know if it should seed or not
  const count = await prisma.lookingForANewJobs.count();
  if (count === 0) {
    await seedStaticInfo();
  }

  const skillsCount = await prisma.skills.count();
  if (skillsCount) {
    await seedSkills();
  }

  const usersCount = await prisma.users.count();
  if (usersCount === 0) {
    await seedUsers();
    await seedProfiles();
    await seedUserInfo();
  }

  process.exit(0);
}

seed();
