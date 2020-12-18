const { Router } = require("express");

const { developmentalGoals } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");
const {
  sameUserMiddleware,
  validationMiddlware,
  profileStatusMiddleware,
} = require("../../utils/middlewares");
const { userIdParamValidator, idsBodyValidator } = require("./utils/validator");
const { langValidator } = require("../util/commonValidators");

const developmentalGoalsRouter = Router({ mergeParams: true });

developmentalGoalsRouter
  .route("/")
  .all(keycloak.protect(), [userIdParamValidator])
  .get(
    [langValidator],
    validationMiddlware,
    profileStatusMiddleware,
    developmentalGoals.getDevelopmentalGoals
  )
  .put(
    [idsBodyValidator],
    validationMiddlware,
    sameUserMiddleware,
    developmentalGoals.setDevelopmentalGoals
  );

module.exports = developmentalGoalsRouter;
