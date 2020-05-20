const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const profile = require("../../core/profile/profile");

const profileRouter = Router();

// Profile endpoints
profileRouter.get("/", keycloak.protect(), profile.getProfile);

profileRouter
	.route("/:id")
	.get(keycloak.protect(), profile.getPublicProfileById)
	.post(keycloak.protect(), profile.createProfile)
	.put(keycloak.protect(), profile.updateProfile);

// TODO: Change frontend api to profile/private instead of private/profile
profileRouter
	.route("/private/:id")
	.get(keycloak.protect(), profile.getPrivateProfileById);

profileRouter
	.route("/private/status/:id")
	.get(keycloak.protect(), profile.getProfileStatusById);

module.exports = profileRouter;
