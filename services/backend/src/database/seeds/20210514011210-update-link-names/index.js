const path = require("path");
const prisma = require("../..");

async function seedStaticInfo() {
  const [dataEng, dataFr] = await prisma.$transaction([
    prisma.opTransAttachmentLinkName.findMany({
      where: {
        name: "Reference letter",
      },
    }),
    prisma.opTransAttachmentLinkName.findMany({
      where: {
        name: "Lettre de recommandation",
      },
    }),
  ]);

  await prisma.$transaction([
    prisma.opTransAttachmentLinkName.delete({
      where: {
        id: dataEng[0].id,
      },
    }),
    prisma.opTransAttachmentLinkName.delete({
      where: {
        id: dataFr[0].id,
      },
    }),
    prisma.opAttachmentLinkName.delete({
      where: {
        id: dataEng[0].opAttachmentLinkNameId,
      },
    }),
  ]);
}

async function seed() {
  const folderName = path.dirname(__filename).split(path.sep).pop();

  const dbSeed = await prisma.dbSeed.findOne({
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
