const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const profile = require("../../core/profile/profile");

const {
  langValidator,
  UUIDValidator,
  updateProfileValidator,
} = require("./validator");

const profileRouter = Router();

profileRouter
  .route("/:id")
  .get(
    keycloak.protect(),
    [UUIDValidator, langValidator],
    profile.getPublicProfileById
  )
  .put(keycloak.protect(), updateProfileValidator, profile.updateProfile)
  .post(keycloak.protect(), updateProfileValidator, profile.updateProfile);

profileRouter
  .route("/private/:id")
  .get(
    keycloak.protect(),
    [UUIDValidator, langValidator],
    profile.getPrivateProfileById
  );

module.exports = profileRouter;
