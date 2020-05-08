const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");

const profileGenRouter = Router();
profileGenRouter.get(
  "/:id",
  keycloak.protect(),
  profileGeneration.getGedsAssist
);

module.exports = profileGenRouter;
