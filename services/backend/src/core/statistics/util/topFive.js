const _ = require("lodash");
const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getTopFiveSkillsHelper(skills, language) {
  const skillsCount = _(skills)
    .groupBy("skillId")
    .values()
    .map((i) => {
      return {
        skillId: i[0].skillId,
        count: i.length,
      };
    });

  const topFiveSkillIdsCount = _(skillsCount)
    .sortBy("count")
    .slice(0, 5)
    .value();

  const topFiveSkillIds = topFiveSkillIdsCount.map((i) => i.skillId);

  const topFiveSkills = await prisma.opTransSkills.findMany({
    where: {
      opSkillsId: {
        in: topFiveSkillIds,
      },
      language,
    },
    select: {
      name: true,
      opSkillsId: true,
    },
  });

  const topFiveSkillsCount = topFiveSkills.map((i) => {
    return {
      name: i.name,
      count: topFiveSkillIdsCount.find((j) => j.skillId === i.opSkillsId).count,
    };
  });

  return topFiveSkillsCount;
}

async function getTopFiveCompetenciesHelper(competencies, language) {
  const competenciesCount = _(competencies)
    .groupBy("competencyId")
    .values()
    .map((i) => {
      return {
        competencyId: i[0].competencyId,
        count: i.length,
      };
    });

  const topFiveCompetencyIdsCount = _(competenciesCount)
    .sortBy("count")
    .slice(0, 5)
    .value();

  const topFiveCompetencyIds = topFiveCompetencyIdsCount.map(
    (i) => i.competencyId
  );

  const topFiveCompetencies = await prisma.opTransCompetencies.findMany({
    where: {
      opCompetenciesId: {
        in: topFiveCompetencyIds,
      },
      language,
    },
    select: {
      name: true,
      opCompetenciesId: true,
    },
  });

  const topFiveCompetenciesCount = topFiveCompetencies.map((i) => {
    return {
      name: i.name,
      count: topFiveCompetencyIdsCount.find(
        (j) => j.competencyId === i.opCompetenciesId
      ).count,
    };
  });

  return topFiveCompetenciesCount;
}

async function getTopFiveSkills(request, response) {
  try {
    const { language } = request.query;

    const skillIds = await prisma.skills.findMany({
      select: {
        id: true,
        skillId: true,
      },
    });

    const topFiveSkills = getTopFiveSkillsHelper(skillIds, language);

    response.status(200).json(topFiveSkills);
  } catch (error) {
    response.status(500).send("Error getting the top five skills");
  }
}

async function getTopFiveCompetencies(request, response) {
  try {
    const { language } = request.query;

    const competencyIds = await prisma.developmentalGoals.findMany({
      select: {
        id: true,
        competencyId: true,
      },
    });

    const topFiveCompetencies = getTopFiveCompetenciesHelper(
      competencyIds,
      language
    );

    response.status(200).json(topFiveCompetencies);
  } catch (error) {
    response.status(500).send("Error getting the top five competencies");
  }
}

async function getTopFiveDevelopmentalGoals(request, response) {
  try {
    const { language } = request.query;

    const competencyIds = await prisma.developmentalGoals.findMany({
      where: {
        skillId: undefined,
      },
      select: {
        id: true,
        competencyId: true,
      },
    });

    const skillIds = await prisma.developmentalGoals.findMany({
      where: {
        competencyId: undefined,
      },
      select: {
        id: true,
        skillId: true,
      },
    });

    const topFiveSkills = getTopFiveSkillsHelper(skillIds, language);
    const topFiveCompetencies = getTopFiveCompetenciesHelper(
      competencyIds,
      language
    );

    const topFiveDevelopmentGoals = [
      ...topFiveSkills,
      ...topFiveCompetencies,
    ].slice(0, 5);

    response.status(200).json(topFiveDevelopmentGoals);
  } catch (error) {
    response.status(500).send("Error getting the top five developmental goals");
  }
}

module.exports = {
  getTopFiveSkills,
  getTopFiveCompetencies,
  getTopFiveDevelopmentalGoals,
};
