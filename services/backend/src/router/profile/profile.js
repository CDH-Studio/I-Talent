const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const profile = require("../../core/profile/profile");

const { updateProfileValidator } = require("./validator");

const { langValidator, UUIDValidator } = require("../util/commonValidators");

const profileRouter = Router();

profileRouter
  .route("/:id")
  .get(
    keycloak.protect(),
    [UUIDValidator, langValidator],
    profile.getPublicProfileById
  )
  .put(
    keycloak.protect(),
    [langValidator, UUIDValidator, updateProfileValidator],
    profile.updateProfile
  );

profileRouter
  .route("/private/:id")
  .get(
    keycloak.protect(),
    [UUIDValidator, langValidator],
    profile.getPrivateProfileById
  );

module.exports = profileRouter;
