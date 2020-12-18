const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { actingLevel } = require("../../core/profile");
const {
  validationMiddlware,
  sameUserMiddleware,
} = require("../../utils/middlewares");
const { idParamValidator, userIdParamValidator } = require("./utils/validator");

const actingLevelRouter = Router({ mergeParams: true });

actingLevelRouter.post(
  "/:id",
  keycloak.protect(),
  [idParamValidator, userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  actingLevel.setActingLevel
);

actingLevelRouter.delete(
  "/",
  keycloak.protect(),
  [userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  actingLevel.removeActingLevel
);

module.exports = actingLevelRouter;
