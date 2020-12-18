const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { groupLevel } = require("../../core/profile");
const {
  validationMiddlware,
  sameUserMiddleware,
} = require("../../utils/middlewares");
const { idParamValidator, userIdParamValidator } = require("./utils/validator");

const groupLevelRouter = Router({ mergeParams: true });

groupLevelRouter.post(
  "/:id",
  keycloak.protect(),
  [idParamValidator, userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  groupLevel.setGroupLevel
);

groupLevelRouter.delete(
  "/",
  keycloak.protect(),
  [userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  groupLevel.removeGroupLevel
);

module.exports = groupLevelRouter;
