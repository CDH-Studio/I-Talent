const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { visibility } = require("../../core/profile");
const {
  validationMiddlware,
  sameUserMiddleware,
} = require("../../utils/middlewares");
const { userIdParamValidator } = require("./utils/validator");

const visibilityeRouter = Router({ mergeParams: true });

visibilityeRouter.put(
  "/",
  keycloak.protect(),
  [userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  visibility.updateVisibilityCards
);

module.exports = visibilityeRouter;
