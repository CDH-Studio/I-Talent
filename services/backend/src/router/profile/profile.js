const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");

const {
  getProfile,
  getProfileStatusById,
  updateProfile,
  createProfile,
} = require("../../core/profile/profile");
const { getPublicProfileById } = require("../../core/profile/publicProfile");
const { getPrivateProfileById } = require("../../core/profile/privateProfile");

const profileRouter = Router();

// Profile endpoints
profileRouter.get("/", keycloak.protect(), getProfile);

profileRouter
  .route("/:id")
  .get(keycloak.protect(), getPublicProfileById)
  .post(keycloak.protect(), createProfile)
  .put(keycloak.protect(), updateProfile);

// TODO: Change frontend api to profile/private instead of private/profile
profileRouter
  .route("/private/:id")
  .get(keycloak.protect(), getPrivateProfileById);

profileRouter
  .route("/private/status/:id")
  .get(keycloak.protect(), getProfileStatusById);

module.exports = profileRouter;
