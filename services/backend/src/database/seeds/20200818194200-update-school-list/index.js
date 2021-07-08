const path = require("path");
const prisma = require("../..");
const schools = require("./data/schools");

async function seedStaticInfo() {
  await Promise.all([
    prisma.opTransSchool.deleteMany({}),
    prisma.opSchool.deleteMany({}),
    prisma.education.deleteMany({}),
  ]);
  const setupData = [
    ...schools.map(async ({ abbrProvince, abbrCountry, translations }) => {
      await prisma.opSchool.create({
        data: {
          abbrProvince,
          abbrCountry,
          translations: {
            create: [
              {
                name: translations.en.name,
                language: "ENGLISH",
              },
              {
                name: translations.fr.name,
                language: "FRENCH",
              },
            ],
          },
        },
      });
    }),
  ];

  return Promise.all(setupData);
}

async function seed() {
  const folderName = path.dirname(__filename).split(path.sep).pop();

  const dbSeed = await prisma.dbSeed.findUnique({
    where: { id: folderName },
  });

  if (!dbSeed) {
    console.log(`---- Starting seeding: ${folderName} ----`);
    await seedStaticInfo();
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
