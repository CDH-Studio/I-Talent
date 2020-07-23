const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const profileGen = require("../../core/geds/geds");
const { UUIDValidator } = require("./validator");

const profileGenRouter = Router();

profileGenRouter.get(
  "/:id",
  keycloak.protect(),
  [UUIDValidator],
  profileGen.getGedsSetup
);

profileGenRouter.get(
  "/sync/:id",
  keycloak.protect(),
  [UUIDValidator],
  profileGen.getGedsSync
);

module.exports = profileGenRouter;
