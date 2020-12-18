const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { qualifiedPools } = require("../../core/profile");
const {
  validationMiddlware,
  sameUserMiddleware,
} = require("../../utils/middlewares");
const { idParamValidator, userIdParamValidator } = require("./utils/validator");

const qualifiedPoolsRouter = Router({ mergeParams: true });

// qualifiedPoolsRouter.post(
//   "/:id",
//   keycloak.protect(),
//   [idParamValidator, userIdParamValidator],
//   validationMiddlware,
//   sameUserMiddleware,
//   qualifiedPools.setOfficeLocation
// );

// qualifiedPoolsRouter.delete(
//   "/",
//   keycloak.protect(),
//   [userIdParamValidator],
//   validationMiddlware,
//   sameUserMiddleware,
//   qualifiedPools.removeOfficeLocation
// );

module.exports = qualifiedPoolsRouter;
