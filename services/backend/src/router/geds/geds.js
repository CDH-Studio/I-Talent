const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const profileGen = require("../../core/geds/geds");
const { profileGenValidator } = require("./validator");
const { validationMiddlware } = require("../../utils/middlewares");

const profileGenRouter = Router();

profileGenRouter.get(
  "/:id",
  keycloak.protect(),
  [profileGenValidator],
  validationMiddlware,
  profileGen.getGedsSetup
);

module.exports = profileGenRouter;
