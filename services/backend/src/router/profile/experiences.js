const { Router } = require("express");

const { experiences } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");
const {
  sameUserMiddleware,
  validationMiddlware,
  profileStatusMiddleware,
} = require("../../utils/middlewares");
const {
  userIdParamValidator,
  updateExperienceValidator,
} = require("./utils/validator");
const { langValidator } = require("../util/commonValidators");

const experiencesRouter = Router({ mergeParams: true });

experiencesRouter
  .route("/")
  .all(keycloak.protect(), [userIdParamValidator, langValidator])
  .get(validationMiddlware, profileStatusMiddleware, experiences.getExperiences)
  .put(
    [updateExperienceValidator],
    validationMiddlware,
    sameUserMiddleware,
    experiences.setExperiences
  );

module.exports = experiencesRouter;
