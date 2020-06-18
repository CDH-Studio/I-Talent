const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const profile = require("../../core/profile/profile");

const { langValidator, UUIDValidator } = require("./validator");

const profileRouter = Router();

profileRouter
  .route("/:id")
  .get(
    keycloak.protect(),
    [UUIDValidator, langValidator],
    profile.getPublicProfileById
  )
  .put(keycloak.protect(), profile.updateProfile);

profileRouter
  .route("/:id/status")
  .get(keycloak.protect(), UUIDValidator, profile.getProfileStatusById);

profileRouter
  .route("/private/:id")
  .get(
    keycloak.protect(),
    [UUIDValidator, langValidator],
    profile.getPrivateProfileById
  );

module.exports = profileRouter;
