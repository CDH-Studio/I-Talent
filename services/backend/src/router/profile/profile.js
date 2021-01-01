const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");

const { updateProfile, getProfile } = require("../../core/profile/profile");

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
  .put(
    [userIdParamValidator, updateProfileValidator],
    validationMiddleware,
    sameUserMiddleware,
    updateProfile
  )
  .get(
    [userIdParamValidator, langValidator],
    validationMiddleware,
    profileStatusMiddleware,
    getProfile
  );

module.exports = profileRouter;
