const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { qualifiedPools } = require("../../core/profile");
const {
  validationMiddlware,
  sameUserMiddleware,
  profileStatusMiddleware,
} = require("../../utils/middlewares");
const {
  userIdParamValidator,
  updateQualifiedPoolsValidator,
} = require("./utils/validator");

const qualifiedPoolsRouter = Router({ mergeParams: true });

qualifiedPoolsRouter
  .route("/")
  .all(keycloak.protect(), [userIdParamValidator])
  .get(
    validationMiddlware,
    profileStatusMiddleware,
    qualifiedPools.getQualifiedPools
  )
  .put(
    [updateQualifiedPoolsValidator],
    validationMiddlware,
    sameUserMiddleware,
    qualifiedPools.setQualifiedPools
  );

module.exports = qualifiedPoolsRouter;
