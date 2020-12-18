const { Router } = require("express");

const { competencies } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");
const {
  sameUserMiddleware,
  validationMiddlware,
} = require("../../utils/middlewares");
const { userIdParamValidator } = require("./utils/validator");

const competenciesRouter = Router({ mergeParams: true });

competenciesRouter
  .route("/")
  .all(keycloak.protect(), [userIdParamValidator], validationMiddlware)
  .get(competencies.getCompetencies)
  .put(sameUserMiddleware, competencies.setCompetencies);

module.exports = competenciesRouter;
