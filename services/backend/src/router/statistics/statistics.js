const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const {
  dashboardCount,
  growthRate,
  topFive,
} = require("../../core/statistics");
const { langValidator } = require("./validator");

const statsRouter = Router();

const countRouter = Router();

countRouter.get(
  "/users",
  keycloak.protect("view-admin-console"),
  dashboardCount.countUsers
);
countRouter.get(
  "/hiddenUsers",
  keycloak.protect("view-admin-console"),
  dashboardCount.countHiddenUsers
);
countRouter.get(
  "/inactiveUsers",
  keycloak.protect("view-admin-console"),
  dashboardCount.countInactiveUsers
);
countRouter.get(
  "/exFeederUsers",
  keycloak.protect("view-admin-console"),
  dashboardCount.countExFeederUsers
);

statsRouter.use("/count", countRouter);

statsRouter.get(
  "/growthRateByMonth",
  keycloak.protect("view-admin-console"),
  growthRate.growthRateByMonth
);

statsRouter.get(
  "/growthRateByWeek",
  keycloak.protect("view-admin-console"),
  growthRate.growthRateByWeek
);

statsRouter.get(
  "/topFiveCompetencies",
  keycloak.protect(),
  langValidator,
  topFive.getTopFiveCompetencies
);

statsRouter.get(
  "/topFiveSkills",
  keycloak.protect(),
  langValidator,
  topFive.getTopFiveSkills
);

statsRouter.get(
  "/topFiveDevelopmentalGoals",
  keycloak.protect(),
  langValidator,
  topFive.getTopFiveDevelopmentalGoals
);

module.exports = statsRouter;
