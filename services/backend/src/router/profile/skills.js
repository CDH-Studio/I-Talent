const { Router } = require("express");

const { skills } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");
const {
  sameUserMiddleware,
  validationMiddlware,
} = require("../../utils/middlewares");
const { userIdParamValidator, idsBodyValidator } = require("./utils/validator");
const { langValidator } = require("../util/commonValidators");

const skillsRouter = Router({ mergeParams: true });

skillsRouter
  .route("/")
  .all(keycloak.protect(), [userIdParamValidator])
  .get([langValidator], validationMiddlware, skills.getSkills)
  .put(
    [idsBodyValidator],
    validationMiddlware,
    sameUserMiddleware,
    skills.setSkills
  );

module.exports = skillsRouter;
