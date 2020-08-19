const path = require("path");
const prisma = require("../..");
const data = require("./data");

async function seedData() {
  const setupData = []; // Add prisma api calls to this array
  return Promise.all(setupData);
}

async function seed() {
  const folderName = path.dirname(__filename).split(path.sep).pop();

  const dbSeed = await prisma.dbSeeds.findOne({
    where: { id: folderName },
  });

  if (dbSeed) {
    console.log(`---- Starting seeding: ${folderName} ----`);
    await seedData();
    await prisma.dbSeeds.create({
      data: {
        id: folderName,
      },
    });
    console.log(`---- Finished seeding: ${folderName} ----\n`);
  }

  await prisma.$disconnect();
}

module.exports = seed;
