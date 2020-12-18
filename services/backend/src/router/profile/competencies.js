const { Router } = require("express");

const { competencies } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");
const {
  sameUserMiddleware,
  validationMiddlware,
  profileStatusMiddleware,
} = require("../../utils/middlewares");
const { userIdParamValidator, idsBodyValidator } = require("./utils/validator");
const { langValidator } = require("../util/commonValidators");

const competenciesRouter = Router({ mergeParams: true });

competenciesRouter
  .route("/")
  .all(keycloak.protect(), [userIdParamValidator])
  .get(
    [langValidator],
    validationMiddlware,
    profileStatusMiddleware,
    competencies.getCompetencies
  )
  .put(
    [idsBodyValidator],
    validationMiddlware,
    sameUserMiddleware,
    competencies.setCompetencies
  );

module.exports = competenciesRouter;
