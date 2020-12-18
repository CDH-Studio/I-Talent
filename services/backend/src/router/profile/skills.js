const { Router } = require("express");

const { skills } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");
const {
  sameUserMiddleware,
  validationMiddlware,
} = require("../../utils/middlewares");
const { userIdParamValidator } = require("./utils/validator");

const skillsRouter = Router({ mergeParams: true });

skillsRouter
  .route("/")
  .all(keycloak.protect(), [userIdParamValidator], validationMiddlware)
  .get(skills.getSkills)
  .put(sameUserMiddleware, skills.setSkills);

module.exports = skillsRouter;
