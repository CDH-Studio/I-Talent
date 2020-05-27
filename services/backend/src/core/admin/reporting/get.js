const utils = require('./util');

const statistics = async (request, response) => {
  const skillCount = await utils.countSkillProfiles().then((res) => res);
  const compCount = await utils.countCompetencyProfiles().then((res) => res);
  const developCount = await utils.countDevelopmentGoals().then((res) => res);
  const flaggedProfiles = await utils.flaggedProfiles().then((res) => res);
  const growthRateByMonth = await utils.growthRateByMonth().then((res) => res);
  const growthRateByWeek = await utils.growthRateByWeek().then((res) => res);
  const dashboardCount = await utils.dashboardCount().then((res) => res);

  response.status(200).json({
    growthRateByWeek,
    growthRateByMonth,
    flaggedProfiles,
    developCount,
    skillCount,
    compCount,
    dashboardCount,
  });
};

module.exports = { statistics };
