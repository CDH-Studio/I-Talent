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

async function seed() {
  lookingForANewJobs.forEach(async ({ descriptionEn, descriptionFr }) => {
    await prisma.lookingForANewJobs.create({
      data: {
        descriptionEn,
        descriptionFr,
      },
    });
  });

  tenures.forEach(async ({ descriptionEn, descriptionFr }) => {
    await prisma.tenures.create({
      data: {
        descriptionEn,
        descriptionFr,
      },
    });
  });

  securityClearances.forEach(async ({ descriptionEn, descriptionFr }) => {
    await prisma.securityClearances.create({
      data: {
        descriptionEn,
        descriptionFr,
      },
    });
  });

  careerMobilities.forEach(async ({ descriptionEn, descriptionFr }) => {
    await prisma.careerMobilities.create({
      data: {
        descriptionEn,
        descriptionFr,
      },
    });
  });

  talentMatrixResults.forEach(async ({ descriptionEn, descriptionFr }) => {
    await prisma.talentMatrixResults.create({
      data: {
        descriptionEn,
        descriptionFr,
      },
    });
  });

  keyCompetencies.forEach(async ({ descriptionEn, descriptionFr }) => {
    await prisma.keyCompetencies.create({
      data: {
        descriptionEn,
        descriptionFr,
      },
    });
  });

  groupLevels.forEach(async (description) => {
    await prisma.groupLevels.create({
      data: {
        description,
      },
    });
  });

  diplomas.forEach(async ({ descriptionEn, descriptionFr }) => {
    await prisma.diplomas.create({
      data: {
        descriptionEn,
        descriptionFr,
      },
    });
  });

  schools.forEach(async ({ state, country, description }) => {
    await prisma.schools.create({
      data: {
        state,
        country,
        description,
      },
    });
  });

  categories.forEach(async ({ descriptionEn, descriptionFr }) => {
    await prisma.categories.create({
      data: {
        descriptionEn,
        descriptionFr,
      },
    });
  });

  skills.forEach(async ({ descriptionEn, descriptionFr, type, categoryId }) => {
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
  });

  locations.forEach(async (i) => {
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
  });

  competencies.forEach(async ({ descriptionEn, descriptionFr }) => {
    await prisma.competencies.create({
      data: {
        descriptionEn,
        descriptionFr,
      },
    });
  });

  users.forEach(async ({ id, name, email }) => {
    await prisma.users.create({
      data: {
        id,
        name,
        email,
      },
    });
  });

  profiles.forEach(
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
        },
      });
    }
  );

  experiences.forEach(
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
  );

  profileOrganizations.forEach(
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
  );
}

seed();
