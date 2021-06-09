const path = require("path");
const prisma = require("../..");

const classifications = require("./data/classifications");

async function seedStaticInfo() {
  const staticInfo = [
    ...classifications.map(async (name) => {
      await prisma.opClassification.create({
        data: {
          name,
        },
      });
    }),
  ];
  return Promise.all(staticInfo);
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
