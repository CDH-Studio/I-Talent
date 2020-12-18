const { Router } = require("express");

const { mentorshipSkills } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");
const {
  sameUserMiddleware,
  validationMiddlware,
} = require("../../utils/middlewares");
const { userIdParamValidator, idsBodyValidator } = require("./utils/validator");
const { langValidator } = require("../util/commonValidators");

const mentorshipSkillsRouter = Router({ mergeParams: true });

mentorshipSkillsRouter
  .route("/")
  .all(keycloak.protect(), [userIdParamValidator])
  .get(
    [langValidator],
    validationMiddlware,
    mentorshipSkills.getMentorshipSkills
  )
  .put(
    [idsBodyValidator],
    validationMiddlware,
    sameUserMiddleware,
    mentorshipSkills.setMentorshipSkills
  );

module.exports = mentorshipSkillsRouter;
