const utils = require("./util");

const statistics = async (request, response) => {
  Promise.all([
    utils.countSkillProfiles(),
    utils.countCompetencyProfiles(),
    utils.countDevelopmentGoals(),
    utils.flaggedProfiles(),
    utils.growthRateByMonth(),
    utils.growthRateByWeek(),
    utils.dashboardCount(),
  ])
    .then(
      ([
        skillCount,
        compCount,
        developCount,
        flaggedProfiles,
        growthRateByMonth,
        growthRateByWeek,
        dashboardCount,
      ]) => {
        response.status(200).json({
          skillCount,
          compCount,
          developCount,
          flaggedProfiles,
          growthRateByMonth,
          growthRateByWeek,
          dashboardCount,
        });
      }
    )
    .catch((error) => {
      console.error(error);
      response.status(500).send(error);
    });
};

module.exports = { statistics };
