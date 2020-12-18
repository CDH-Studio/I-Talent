const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { tenure } = require("../../core/profile");
const {
  validationMiddlware,
  sameUserMiddleware,
} = require("../../utils/middlewares");
const { idParamValidator, userIdParamValidator } = require("./utils/validator");

const tenureRouter = Router({ mergeParams: true });

tenureRouter.post(
  "/:id",
  keycloak.protect(),
  [idParamValidator, userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  tenure.setTenure
);

tenureRouter.delete(
  "/",
  keycloak.protect(),
  [userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  tenure.removeTenure
);

module.exports = tenureRouter;
