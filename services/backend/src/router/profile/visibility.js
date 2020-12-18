const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { visibility } = require("../../core/profile");
const {
  validationMiddlware,
  sameUserMiddleware,
} = require("../../utils/middlewares");
const { userIdParamValidator } = require("./utils/validator");

const tenureRouter = Router({ mergeParams: true });

tenureRouter.get(
  "/",
  keycloak.protect(),
  [userIdParamValidator],
  validationMiddlware,
  visibility.getVisibilityCards
);

tenureRouter.delete(
  "/",
  keycloak.protect(),
  [userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  visibility.updateVisibilityCards
);

module.exports = tenureRouter;
