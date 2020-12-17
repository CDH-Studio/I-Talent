const _ = require("lodash");
const prisma = require("../../database");

async function getDevelopmentalGoals(request, response) {
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
      name: true,
      opSkill: {
        select: {
          id: true,
          categoryId: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  const competencies = competenciesQuery.map((i) => ({
    id: i.opCompetencyId,
    name: i.name,
  }));

  const skills = skillsQuery.map((i) => ({
    id: i.opSkill.id,
    name: i.name,
    categoryId: i.opSkill.categoryId,
  }));

  const developmentalGoals = _.sortBy([...competencies, ...skills], "name");

  response.status(200).json(developmentalGoals);
}

module.exports = {
  getDevelopmentalGoals,
};
