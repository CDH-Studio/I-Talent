const { Router } = require("express");

const { experiences } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");
const {
  sameUserMiddleware,
  validationMiddlware,
} = require("../../utils/middlewares");
const { userIdParamValidator } = require("./utils/validator");
const { langValidator } = require("../util/commonValidators");

const experiencesRouter = Router({ mergeParams: true });

// experiencesRouter
//   .route("/")
//   .all(keycloak.protect(), [userIdParamValidator])
//   .get([langValidator], validationMiddlware, experiences.getEducations)
//   .put(validationMiddlware, sameUserMiddleware, experiences.setEducations);

module.exports = experiencesRouter;
