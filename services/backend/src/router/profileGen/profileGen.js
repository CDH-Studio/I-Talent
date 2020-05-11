const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");

const { getGedsAssist } = require("../../core/profileGen/profileGen");

const profileGenRouter = Router();

profileGenRouter.get("/:id", keycloak.protect(), getGedsAssist);

module.exports = profileGenRouter;
