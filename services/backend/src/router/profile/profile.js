const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");

const { profile } = require("../../core/profile/profile");

const { userIdParamValidator, updateProfileValidator } = require("./validator");

const {
  validationMiddleware,
  sameUserMiddleware,
  profileStatusMiddleware,
} = require("../../utils/middleware");

const { langValidator } = require("../util/commonValidators");

const profileRouter = Router();

profileRouter
  .route("/:userId")
  .all(keycloak.protect())
  .delete([userIdParamValidator], validationMiddleware, profile.deleteProfile)
  .put(
    [userIdParamValidator, updateProfileValidator],
    validationMiddleware,
    sameUserMiddleware,
    profile.updateProfile
  )
  .get(
    [userIdParamValidator, langValidator],
    validationMiddleware,
    profileStatusMiddleware,
    profile.getProfile
  );

module.exports = profileRouter;
