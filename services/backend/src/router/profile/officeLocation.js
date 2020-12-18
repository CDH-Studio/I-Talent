const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { officeLocation } = require("../../core/profile");
const {
  validationMiddlware,
  sameUserMiddleware,
} = require("../../utils/middlewares");
const { idParamValidator, userIdParamValidator } = require("./utils/validator");

const officeLocationRouter = Router({ mergeParams: true });

officeLocationRouter.post(
  "/:id",
  keycloak.protect(),
  [idParamValidator, userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  officeLocation.setOfficeLocation
);

officeLocationRouter.delete(
  "/",
  keycloak.protect(),
  [userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  officeLocation.removeOfficeLocation
);

module.exports = officeLocationRouter;
