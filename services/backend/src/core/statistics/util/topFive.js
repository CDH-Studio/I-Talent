const _ = require("lodash");
const prisma = require("../../../database");

async function getTopFiveSkillsHelper(skills, language) {
  const skillsCount = _(skills)
    .groupBy("skillId")
    .values()
    .map((i) => ({
      skillId: i[0].skillId,
      count: i.length,
    }));

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

  const topFiveSkillsCount = topFiveSkills.map((i) => ({
    name: i.name,
    count: topFiveSkillIdsCount.find((j) => j.skillId === i.opSkillId).count,
  }));

  return topFiveSkillsCount;
}

async function getTopFiveCompetenciesHelper(competencies, language) {
  const competenciesCount = _(competencies)
    .groupBy("competencyId")
    .values()
    .map((i) => ({
      competencyId: i[0].competencyId,
      count: i.length,
    }));

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

  const topFiveCompetenciesCount = topFiveCompetencies.map((i) => ({
    name: i.name,
    count: topFiveCompetencyIdsCount.find(
      (j) => j.competencyId === i.opCompetencyId
    ).count,
  }));

  return topFiveCompetenciesCount;
}

async function getTopFiveSkills(request, response) {
  const { language } = request.query;

  const skillIds = await prisma.skill.findMany({
    select: {
      id: true,
      skillId: true,
    },
  });

  const topFiveSkills = await getTopFiveSkillsHelper(skillIds, language);

  const sortedTopFiveSkills = _.orderBy(
    topFiveSkills,
    ["count", "name"],
    ["desc", "asc"]
  );

  response.status(200).json(sortedTopFiveSkills);
}

async function getTopFiveCompetencies(request, response) {
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

  const sortedTopFiveCompetencies = _.orderBy(
    topFiveCompetencies,
    ["count", "name"],
    ["desc", "asc"]
  );

  response.status(200).json(sortedTopFiveCompetencies);
}

async function getTopFiveDevelopmentalGoals(request, response) {
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

  const sortedTopFiveDevelopmentalGoals = _.orderBy(
    [...topFive[0], ...topFive[1]],
    ["count", "name"],
    ["desc", "asc"]
  ).slice(0, 5);

  response.status(200).json(sortedTopFiveDevelopmentalGoals);
}

module.exports = {
  getTopFiveSkills,
  getTopFiveCompetencies,
  getTopFiveDevelopmentalGoals,
};
