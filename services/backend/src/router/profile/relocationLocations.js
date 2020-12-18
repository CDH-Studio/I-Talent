const { Router } = require("express");

const { relocationLocations } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");
const {
  sameUserMiddleware,
  validationMiddlware,
} = require("../../utils/middlewares");
const { userIdParamValidator } = require("./utils/validator");
const { langValidator } = require("../util/commonValidators");

const relocationLocationsRouter = Router({ mergeParams: true });

relocationLocationsRouter
  .route("/")
  .all(keycloak.protect(), [userIdParamValidator])
  .get(
    [langValidator],
    validationMiddlware,
    relocationLocations.getRelocationLocations
  )
  .put(
    validationMiddlware,
    sameUserMiddleware,
    relocationLocations.setRelocationLocations
  );

module.exports = relocationLocationsRouter;
