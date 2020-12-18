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
    qualifiedPools.setQualifiedPools
  )
  .put(
    [updateQualifiedPoolsValidator],
    validationMiddlware,
    sameUserMiddleware,
    qualifiedPools.getQualifiedPools
  );

module.exports = qualifiedPoolsRouter;
