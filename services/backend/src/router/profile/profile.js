const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");

const {
  getProfile,
  getPrivateProfileById,
  getPublicProfileById,
  getProfileStatusById,
  createProfile,
  updateProfile,
} = require("../../core/profile/profile");

const profileRouter = Router();

profileRouter.get("/", keycloak.protect(), getProfile);

profileRouter
  .route("/:id")
  .get(keycloak.protect(), getPublicProfileById)
  .post(keycloak.protect(), createProfile)
  .put(keycloak.protect(), updateProfile);

// FIXME: Change frontend api to profile/private instead of private/profile
profileRouter
  .route("/private/:id")
  .get(keycloak.protect(), getPrivateProfileById);

profileRouter
  .route("/private/status/:id")
  .get(keycloak.protect(), getProfileStatusById);

module.exports = profileRouter;
