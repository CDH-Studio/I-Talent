const { Router } = require("express");

const { educations } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");
const {
  sameUserMiddleware,
  validationMiddlware,
} = require("../../utils/middlewares");
const { userIdParamValidator } = require("./utils/validator");
const { langValidator } = require("../util/commonValidators");

const educationsRouter = Router({ mergeParams: true });

educationsRouter
  .route("/")
  .all(keycloak.protect(), [userIdParamValidator])
  .get([langValidator], validationMiddlware, educations.getEducations)
  .put(validationMiddlware, sameUserMiddleware, educations.setEducations);

module.exports = educationsRouter;
