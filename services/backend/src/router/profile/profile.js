const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { profile } = require("../../core/profile");
const {
  userIdParamValidator,
  createProfileValidator,
  updateProfileValidator,
} = require("./utils/validator");
const {
  validationMiddlware,
  sameUserMiddleware,
  profileStatusMiddleware,
} = require("../../utils/middlewares");
const { langValidator } = require("../util/commonValidators");

const profileRouter = Router();

profileRouter
  .route("/")
  .all(keycloak.protect())
  .post([createProfileValidator], validationMiddlware, profile.createProfile);

profileRouter
  .route("/:userId")
  .all(keycloak.protect())
  .delete([userIdParamValidator], validationMiddlware, profile.deleteProfile)
  .put(
    [userIdParamValidator, updateProfileValidator],
    validationMiddlware,
    sameUserMiddleware,
    profile.updateProfile
  )
  .get(
    [userIdParamValidator, langValidator],
    validationMiddlware,
    profileStatusMiddleware,
    profile.getProfile
  );

module.exports = profileRouter;
