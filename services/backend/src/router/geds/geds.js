const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const profileGen = require("../../core/geds/geds");
const { UUIDValidator } = require("../util/commonValidators");
const { validationMiddlware } = require("../../utils/middlewares");

const profileGenRouter = Router();

profileGenRouter.get(
  "/:id",
  keycloak.protect(),
  [UUIDValidator],
  validationMiddlware,
  profileGen.getGedsSetup
);

module.exports = profileGenRouter;
