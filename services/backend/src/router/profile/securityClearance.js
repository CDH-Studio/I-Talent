const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { securityClearance } = require("../../core/profile");
const {
  validationMiddlware,
  sameUserMiddleware,
} = require("../../utils/middlewares");
const { idParamValidator, userIdParamValidator } = require("./utils/validator");

const securityClearanceRouter = Router({ mergeParams: true });

securityClearanceRouter.post(
  "/:id",
  keycloak.protect(),
  [idParamValidator, userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  securityClearance.setSecurityClearance
);

securityClearanceRouter.delete(
  "/",
  keycloak.protect(),
  [userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  securityClearance.removeSecurityClearance
);

module.exports = securityClearanceRouter;
