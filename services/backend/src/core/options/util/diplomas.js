const _ = require("lodash");
const prisma = require("../../../database");

async function getDiplomas(request, response) {
  const { language } = request.query;

  const diplomasQuery = await prisma.opTransDiploma.findMany({
    where: {
      language,
    },
    select: {
      opDiplomaId: true,
      description: true,
    },
    orderBy: {
      description: "asc",
    },
  });

  const diplomas = _.sortBy(
    diplomasQuery.map((i) => ({
      id: i.opDiplomaId,
      description: i.description,
    })),
    "description"
  );

  response.status(200).json(diplomas);
}

async function getDiplomasAllLang(request, response) {
  const diplomasQuery = await prisma.opDiploma.findMany({
    select: {
      id: true,
      translations: {
        select: {
          language: true,
          description: true,
        },
      },
    },
  });

  const diplomas = _.orderBy(
    diplomasQuery.map((i) => ({
      id: i.id,
      en: i.translations.find((j) => j.language === "ENGLISH").description,
      fr: i.translations.find((j) => j.language === "FRENCH").description,
    })),
    ["en", "fr"]
  );

  response.status(200).json(diplomas);
}

async function createDiploma(request, response) {
  const { en, fr } = request.body;

  await prisma.opDiploma.create({
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

  response.sendStatus(201);
}

async function updateDiploma(request, response) {
  const { id, en, fr } = request.body;

  await prisma.opDiploma.update({
    where: {
      id,
    },
    data: {
      translations: {
        updateMany: [
          {
            where: {
              language: "ENGLISH",
            },
            data: {
              description: en,
            },
          },
          {
            where: {
              language: "FRENCH",
            },
            data: {
              description: fr,
            },
          },
        ],
      },
    },
  });

  response.sendStatus(204);
}

async function deleteDiploma(request, response) {
  const { id } = request.body;

  await prisma.$transaction([
    prisma.opTransDiploma.deleteMany({
      where: {
        opDiplomaId: id,
      },
    }),
    prisma.opDiploma.delete({
      where: {
        id,
      },
    }),
  ]);

  response.sendStatus(204);
}

async function deleteDiplomas(request, response) {
  const { ids } = request.body;

  await prisma.$transaction([
    prisma.opTransDiploma.deleteMany({
      where: {
        opDiplomaId: {
          in: ids,
        },
      },
    }),
    prisma.opDiploma.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  ]);

  response.sendStatus(204);
}

module.exports = {
  getDiplomas,
  getDiplomasAllLang,
  createDiploma,
  updateDiploma,
  deleteDiploma,
  deleteDiplomas,
};
