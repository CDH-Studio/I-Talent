const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getCompetencies(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const competenciesQuery = await prisma.opTransCompetencies.findMany({
      where: {
        language,
      },
      select: {
        opCompetenciesId: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const competencies = competenciesQuery.map((i) => {
      return {
        id: i.opCompetenciesId,
        name: i.name,
      };
    });

    response.status(200).json(competencies);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching competency options");
  }
}

async function getCompetenciesAllLang(request, response) {
  try {
    const competenciesQuery = await prisma.opCompetencies.findMany({
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

    const competencies = competenciesQuery.map((i) => {
      return {
        id: i.id,
        en: i.translations.find((j) => j.language === "ENGLISH").name,
        fr: i.translations.find((j) => j.language === "FRENCH").name,
      };
    });

    response.status(200).json(competencies);
  } catch (error) {
    response
      .status(500)
      .send("Error fetching competency options in every language");
  }
}

async function createCompetency(request, response) {
  try {
    validationResult(request).throw();

    const { en, fr } = request.body;

    await prisma.opCompetencies.create({
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
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error creating a competency option");
  }
}

async function updateCompetency(request, response) {
  try {
    validationResult(request).throw();

    const { id, en, fr } = request.body;

    await prisma.opCompetencies.update({
      where: {
        id,
      },
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

    response
      .status(200)
      .send("Successfully updated the specified competency option");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error updating the specified competency option");
  }
}

async function deleteCompetency(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.body;

    await prisma.competencies.deleteMany({
      where: {
        competencyId: id,
      },
    });

    await prisma.developmentalGoals.deleteMany({
      where: {
        competencyId: id,
      },
    });

    await prisma.opCompetencies.delete({
      where: {
        id,
      },
    });

    response
      .status(200)
      .send("Successfully deleted the specified competency option");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error deleting the specified competency option");
  }
}

async function deleteCompetencies(request, response) {
  try {
    validationResult(request).throw();

    const { ids } = request.body;

    await prisma.competencies.deleteMany({
      where: {
        competencyId: {
          in: ids,
        },
      },
    });

    await prisma.developmentalGoals.deleteMany({
      where: {
        competencyId: {
          in: ids,
        },
      },
    });

    await prisma.opCompetencies.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    response
      .status(200)
      .send("Successfully deleted the specified competency options");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response
      .status(500)
      .send("Error deleting the specified competency options");
  }
}

module.exports = {
  getCompetencies,
  getCompetenciesAllLang,
  createCompetency,
  updateCompetency,
  deleteCompetency,
  deleteCompetencies,
};
