const path = require("path");
const prisma = require("../../");
//const data = require("./data/relocationLocations");
const generateRelocationLocationsFromOfficeLocations = require("./data/relocationLocations");

async function seedData() {
  const data = await generateRelocationLocationsFromOfficeLocations();

  const staticInfo = [
    ...data.map(async (relocationLocation) => {
      await prisma.opRelocationLocation.create({
        data: {
          translations: {
            create: relocationLocation.map(({ language, city, province }) => ({
              language,
              city,
              province,
            })),
          },
        },
      });
    }),
  ];
  return Promise.all(staticInfo);
}

async function seed() {
  const folderName = path.dirname(__filename).split(path.sep).pop();

  const dbSeed = await prisma.dbSeed.findOne({
    where: { id: folderName },
  });

  if (!dbSeed) {
    console.log(`---- Starting seeding: ${folderName} ----`);
    await seedData();
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
