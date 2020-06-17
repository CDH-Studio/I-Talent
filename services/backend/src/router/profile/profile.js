const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const profile = require("../../core/profile/profile");

const { langValidator } = require("./validator");

const profileRouter = Router();

profileRouter
  .route("/:id")
  .get(keycloak.protect(), langValidator, profile.getPublicProfileById)
  .put(keycloak.protect(), profile.updateProfile);

profileRouter
  .route("/private/:id")
  .get(keycloak.protect(), langValidator, profile.getPrivateProfileById);

profileRouter
  .route("/private/status/:id")
  .get(keycloak.protect(), profile.getProfileStatusById);

module.exports = profileRouter;
