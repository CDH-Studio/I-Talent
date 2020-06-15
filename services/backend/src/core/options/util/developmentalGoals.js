const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getDevelopmentalGoals(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const skillsQuery = await prisma.opTransCompetencies.findMany({
      where: {
        language,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const competenciesQuery = await prisma.opTransCompetencies.findMany({
      where: {
        language,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const competencies = competenciesQuery.map((i) => {
      return {
        id: i.opCompetenciesId,
        name: i.name,
      };
    });

    const skills = skillsQuery.map((i) => {
      return {
        id: i.opSkillsId,
        name: i.name,
      };
    });

    const developmentalGoals = [...competencies, ...skills];

    response.status(200).json(developmentalGoals);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching developmentalGoal options");
  }
}

module.exports = {
  getDevelopmentalGoals,
};
