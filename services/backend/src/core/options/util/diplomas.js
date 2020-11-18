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

  response.status(200).send("Successfully created a diploma option");
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

  response
    .status(200)
    .send("Successfully updated the specified diploma option");
}

async function deleteDiploma(request, response) {
  const { id } = request.body;

  await prisma.opTransDiploma.deleteMany({
    where: {
      opDiplomaId: id,
    },
  });

  await prisma.opDiploma.delete({
    where: {
      id,
    },
  });

  response
    .status(200)
    .send("Successfully deleted the specified diploma option");
}

async function deleteDiplomas(request, response) {
  const { ids } = request.body;

  await prisma.opTransDiploma.deleteMany({
    where: {
      opDiplomaId: {
        in: ids,
      },
    },
  });

  await prisma.opDiploma.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  response
    .status(200)
    .send("Successfully deleted the specified diploma options");
}

module.exports = {
  getDiplomas,
  getDiplomasAllLang,
  createDiploma,
  updateDiploma,
  deleteDiploma,
  deleteDiplomas,
};
