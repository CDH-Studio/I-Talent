const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const { getGedsSetup } = require("../../core/geds/geds");
const { profileGenValidator } = require("./validator");
const { validationMiddleware } = require("../../utils/middleware");

const profileGenRouter = Router();

profileGenRouter.get(
  "/",
  keycloak.protect(),
  [profileGenValidator],
  validationMiddleware,
  getGedsSetup
);

module.exports = profileGenRouter;
