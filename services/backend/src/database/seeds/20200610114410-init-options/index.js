const path = require("path");
const { PrismaClient } = require("../../client");
const {
  lookingJobs,
  tenures,
  securityClearances,
  careerMobilities,
  talentMatrixResults,
  classifications,
  diplomas,
  schools,
  categories,
  officeLocations,
  competencies,
} = require("./data");

const prisma = new PrismaClient();

async function seedStaticInfo() {
  const staticInfo = [
    ...lookingJobs.map(async ({ en, fr }) => {
      await prisma.opLookingJobs.create({
        data: {
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
        },
      });
    }),

    ...tenures.map(async ({ en, fr }) => {
      await prisma.opTenures.create({
        data: {
          translations: {
            create: [
              {
                name: en,
                language: "ENGLISH",
              },
              {
                name: fr,
                language: "FRENCH",
              },
            ],
          },
        },
      });
    }),

    ...securityClearances.map(async ({ en, fr }) => {
      await prisma.opSecurityClearances.create({
        data: {
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
        },
      });
    }),

    ...careerMobilities.map(async ({ en, fr }) => {
      await prisma.opCareerMobilities.create({
        data: {
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
        },
      });
    }),

    ...talentMatrixResults.map(async ({ en, fr }) => {
      await prisma.opTalentMatrixResults.create({
        data: {
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
        },
      });
    }),

    ...classifications.map(async (name) => {
      await prisma.opClassifications.create({
        data: {
          name,
        },
      });
    }),

    ...diplomas.map(async ({ en, fr }) => {
      await prisma.opDiplomas.create({
        data: {
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
        },
      });
    }),

    ...schools.map(async ({ abbrProvince, abbrCountry, translations }) => {
      await prisma.opSchools.create({
        data: {
          abbrProvince,
          abbrCountry,
          translations: {
            create: Object.keys(translations).map((i) => {
              return {
                name: translations[i].name,
                language: i === "en" ? "ENGLISH" : "FRENCH",
              };
            }),
          },
        },
      });
    }),

    ...categories.map(async ({ en, fr, skills }) => {
      await prisma.opCategories.create({
        data: {
          translations: {
            create: [
              {
                name: en,
                language: "ENGLISH",
              },
              {
                name: fr,
                language: "FRENCH",
              },
            ],
          },
          opSkills: {
            create: skills.map((skill) => {
              return {
                translations: {
                  create: [
                    {
                      name: skill.en,
                      language: "ENGLISH",
                    },
                    {
                      name: skill.fr,
                      language: "FRENCH",
                    },
                  ],
                },
              };
            }),
          },
        },
      });
    }),

    ...officeLocations.map(
      async ({ streetNumber, postalCode, city, country, translations }) => {
        await prisma.opOfficeLocations.create({
          data: {
            streetNumber,
            postalCode,
            city,
            country,
            translations: {
              create: [
                {
                  province: translations.en.province,
                  streetName: translations.en.streetName,
                  language: "ENGLISH",
                },
                {
                  province: translations.fr.province,
                  streetName: translations.en.streetName,
                  language: "FRENCH",
                },
              ],
            },
          },
        });
      }
    ),

    ...competencies.map(async ({ en, fr }) => {
      await prisma.opCompetencies.create({
        data: {
          translations: {
            create: [
              {
                name: en,
                language: "ENGLISH",
              },
              {
                name: fr,
                language: "FRENCH",
              },
            ],
          },
        },
      });
    }),
  ];

  return Promise.all(staticInfo);
}

async function seed() {
  const folderName = path.dirname(__filename).split(path.sep).pop();

  const dbSeed = await prisma.dbSeeds.findOne({
    where: { id: folderName },
  });

  if (!dbSeed) {
    console.log(`---- Starting seeding: ${folderName} ----`);
    await seedStaticInfo();
    await prisma.dbSeeds.create({
      data: {
        id: folderName,
      },
    });
    console.log(`---- Finished seeding: ${folderName} ----\n`);
  }
}

module.exports = seed;
