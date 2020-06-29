const { validationResult } = require("express-validator");
const prisma = require("../../../database");

async function getDevelopmentalGoals(request, response) {
  try {
    validationResult(request).throw();

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

    const skillsQuery = await prisma.opTransSkill.findMany({
      where: {
        language,
      },
      select: {
        opSkillId: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const competencies = competenciesQuery.map((i) => {
      return {
        id: i.opCompetencyId,
        name: i.name,
      };
    });

    const skills = skillsQuery.map((i) => {
      return {
        id: i.opSkillId,
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
