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

  const competencies = _.sortBy(
    competenciesQuery.map((i) => ({
      id: i.opCompetencyId,
      name: i.name,
    })),
    "name"
  );

  response.status(200).json(competencies);
}

async function getCompetenciesAllLang(request, response) {
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

  response.status(200).send("Successfully created a competency option");
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

  response
    .status(200)
    .send("Successfully updated the specified competency option");
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

  response
    .status(200)
    .send("Successfully deleted the specified competency option");
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

  response
    .status(200)
    .send("Successfully deleted the specified competency options");
}

module.exports = {
  getCompetencies,
  getCompetenciesAllLang,
  createCompetency,
  updateCompetency,
  deleteCompetency,
  deleteCompetencies,
};
