const { Router } = require("express");
const { competencies } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");

const competenciesRouter = Router({ mergeParams: true });

competenciesRouter
  .route("/")
  .all(keycloak.protect())
  .get(competencies.getCompetencies)
  .put(competencies.setCompetencies);

module.exports = competenciesRouter;
