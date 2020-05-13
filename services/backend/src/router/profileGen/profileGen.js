const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const profileGen = require("../../core/profileGen/profileGen");

const profileGenRouter = Router();

profileGenRouter.get("/:id", keycloak.protect(), profileGen.getGedsAssist);

module.exports = profileGenRouter;
