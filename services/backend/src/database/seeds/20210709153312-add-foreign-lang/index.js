const path = require("path");
const prisma = require("../..");
const data = require("./data/data");

async function seedStaticInfo() {
  const staticInfo = [
    ...data.map(async ({ en, fr, skills }) => {
      await prisma.opCategory.create({
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
            create: skills.map((skill) => ({
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
