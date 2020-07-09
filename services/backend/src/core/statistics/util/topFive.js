const _ = require("lodash");
const { validationResult } = require("express-validator");
const prisma = require("../../../database");

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

  const topFiveSkillIdsCount = skillsCount.orderBy("count", "desc").slice(0, 5);
  const topFiveSkillIds = topFiveSkillIdsCount.map("skillId").value();

  const topFiveSkills = await prisma.opTransSkill.findMany({
    where: {
      opSkillId: {
        in: topFiveSkillIds,
      },
      language,
    },
    select: {
      name: true,
      opSkillId: true,
    },
  });

  const topFiveSkillsCount = topFiveSkills.map((i) => {
    return {
      name: i.name,
      count: topFiveSkillIdsCount.find((j) => j.skillId === i.opSkillId).count,
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

  const topFiveCompetencyIdsCount = competenciesCount
    .orderBy("count", "desc")
    .slice(0, 5);

  const topFiveCompetencyIds = topFiveCompetencyIdsCount
    .map("competencyId")
    .value();

  const topFiveCompetencies = await prisma.opTransCompetency.findMany({
    where: {
      opCompetencyId: {
        in: topFiveCompetencyIds,
      },
      language,
    },
    select: {
      name: true,
      opCompetencyId: true,
    },
  });

  const topFiveCompetenciesCount = topFiveCompetencies.map((i) => {
    return {
      name: i.name,
      count: topFiveCompetencyIdsCount.find(
        (j) => j.competencyId === i.opCompetencyId
      ).count,
    };
  });

  return topFiveCompetenciesCount;
}

async function getTopFiveSkills(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const skillIds = await prisma.skill.findMany({
      select: {
        id: true,
        skillId: true,
      },
    });

    const topFiveSkills = await getTopFiveSkillsHelper(skillIds, language);

    const sortedTopFiveSkills = _.orderBy(topFiveSkills, ["count", "name"]);

    response.status(200).json(sortedTopFiveSkills);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error getting the top five skills");
  }
}

async function getTopFiveCompetencies(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const competencyIds = await prisma.competency.findMany({
      select: {
        id: true,
        competencyId: true,
      },
    });

    const topFiveCompetencies = await getTopFiveCompetenciesHelper(
      competencyIds,
      language
    );

    const sortedTopFiveCompetencies = _.orderBy(topFiveCompetencies, [
      "count",
      "name",
    ]);

    response.status(200).json(sortedTopFiveCompetencies);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error getting the top five competencies");
  }
}

async function getTopFiveDevelopmentalGoals(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const competencyIds = await prisma.developmentalGoal.findMany({
      where: {
        skillId: null,
      },
      select: {
        id: true,
        competencyId: true,
      },
    });

    const skillIds = await prisma.developmentalGoal.findMany({
      where: {
        competencyId: null,
      },
      select: {
        id: true,
        skillId: true,
      },
    });

    const topFive = await Promise.all([
      getTopFiveSkillsHelper(skillIds, language),
      getTopFiveCompetenciesHelper(competencyIds, language),
    ]);

    const topFiveDevelopmentalGoals = [...topFive[0], ...topFive[1]].slice(
      0,
      5
    );

    const sortedTopFiveDevelopmentalGoals = _.orderBy(
      topFiveDevelopmentalGoals,
      ["count", "name"]
    );

    response.status(200).json(sortedTopFiveDevelopmentalGoals);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error getting the top five developmental goals");
  }
}

module.exports = {
  getTopFiveSkills,
  getTopFiveCompetencies,
  getTopFiveDevelopmentalGoals,
};
