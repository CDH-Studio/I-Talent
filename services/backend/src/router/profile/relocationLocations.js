const { Router } = require("express");

const { relocationLocations } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");
const {
  sameUserMiddleware,
  validationMiddlware,
  profileStatusMiddleware,
} = require("../../utils/middlewares");
const { userIdParamValidator, idsBodyValidator } = require("./utils/validator");
const { langValidator } = require("../util/commonValidators");

const relocationLocationsRouter = Router({ mergeParams: true });

relocationLocationsRouter
  .route("/")
  .all(keycloak.protect(), [userIdParamValidator])
  .get(
    [langValidator],
    validationMiddlware,
    profileStatusMiddleware,
    relocationLocations.getRelocationLocations
  )
  .put(
    [idsBodyValidator],
    validationMiddlware,
    sameUserMiddleware,
    relocationLocations.setRelocationLocations
  );

module.exports = relocationLocationsRouter;
