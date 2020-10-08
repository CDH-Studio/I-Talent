const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const profileGen = require("../../core/geds/geds");
const { UUIDValidator } = require("../util/commonValidators");

const profileGenRouter = Router();

profileGenRouter.get(
  "/:id",
  keycloak.protect(),
  [UUIDValidator],
  profileGen.getGedsSetup
);

module.exports = profileGenRouter;
