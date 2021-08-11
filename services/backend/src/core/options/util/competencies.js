const _ = require("lodash");
const prisma = require("../../../database");

async function getCompetencies(request, response) {
  const { language } = request.query;

  const competenciesQuery = await prisma.opTransCompetency.findMany({
    where: {
      language,
    },
    select: {
      opCompetencyId: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const responseData = competenciesQuery.map((competency) => ({
    value: competency.opCompetencyId,
    label: competency.name,
  }));

  response.status(200).json(responseData);
}

async function getCompetenciesAllLang(_request, response) {
  const competenciesQuery = await prisma.opCompetency.findMany({
    select: {
      id: true,
      translations: {
        select: {
          language: true,
          name: true,
        },
      },
    },
  });

  const competencies = _.orderBy(
    competenciesQuery.map((i) => ({
      id: i.id,
      en: i.translations.find((j) => j.language === "ENGLISH").name,
      fr: i.translations.find((j) => j.language === "FRENCH").name,
    })),
    ["en", "fr"]
  );

  response.status(200).json(competencies);
}

async function createCompetency(request, response) {
  const { en, fr } = request.body;

  await prisma.opCompetency.create({
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

  response.sendStatus(201);
}

async function updateCompetency(request, response) {
  const { id, en, fr } = request.body;

  await prisma.opCompetency.update({
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
              name: en,
            },
          },
          {
            where: {
              language: "FRENCH",
            },
            data: {
              name: fr,
            },
          },
        ],
      },
    },
  });

  response.sendStatus(204);
}

async function deleteCompetency(request, response) {
  const { id } = request.body;

  await prisma.$transaction([
    prisma.competency.deleteMany({
      where: {
        competencyId: id,
      },
    }),
    prisma.developmentalGoal.deleteMany({
      where: {
        competencyId: id,
      },
    }),
    prisma.opTransCompetency.deleteMany({
      where: {
        opCompetenciesId: id,
      },
    }),
    prisma.opCompetency.delete({
      where: {
        id,
      },
    }),
  ]);

  response.sendStatus(204);
}

async function deleteCompetencies(request, response) {
  const { ids } = request.body;

  await prisma.$transaction([
    prisma.competency.deleteMany({
      where: {
        competencyId: {
          in: ids,
        },
      },
    }),
    prisma.developmentalGoal.deleteMany({
      where: {
        competencyId: {
          in: ids,
        },
      },
    }),
    prisma.opTransCompetency.deleteMany({
      where: {
        opCompetencyId: {
          in: ids,
        },
      },
    }),
    prisma.opCompetency.deleteMany({
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
  getCompetencies,
  getCompetenciesAllLang,
  createCompetency,
  updateCompetency,
  deleteCompetency,
  deleteCompetencies,
};
