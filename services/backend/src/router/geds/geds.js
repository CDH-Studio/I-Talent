const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const profileGen = require("../../core/geds/geds");
const { profileGenValidator } = require("./validator");
const { validationMiddleware } = require("../../utils/middleware");

const profileGenRouter = Router();

profileGenRouter.get(
  "/",
  keycloak.protect(),
  [profileGenValidator],
  validationMiddleware,
  profileGen.getGedsSetup
);

module.exports = profileGenRouter;
