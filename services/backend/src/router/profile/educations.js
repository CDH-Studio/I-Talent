const { Router } = require("express");

const { educations } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");
const {
  sameUserMiddleware,
  validationMiddlware,
  profileStatusMiddleware,
} = require("../../utils/middlewares");
const {
  userIdParamValidator,
  updateEducationValidator,
} = require("./utils/validator");
const { langValidator } = require("../util/commonValidators");

const educationsRouter = Router({ mergeParams: true });

educationsRouter
  .route("/")
  .all(keycloak.protect(), [userIdParamValidator, langValidator])
  .get(validationMiddlware, profileStatusMiddleware, educations.getEducations)
  .put(
    [updateEducationValidator],
    validationMiddlware,
    sameUserMiddleware,
    educations.setEducations
  );

module.exports = educationsRouter;
