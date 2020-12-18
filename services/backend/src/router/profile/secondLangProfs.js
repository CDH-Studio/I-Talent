const { Router } = require("express");

const { secondLangProfs } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");
const {
  sameUserMiddleware,
  validationMiddlware,
} = require("../../utils/middlewares");
const {
  userIdParamValidator,
  updateSecondLangProfsValidator,
} = require("./utils/validator");

const secondLangProfsRouter = Router({ mergeParams: true });

secondLangProfsRouter
  .route("/")
  .all(keycloak.protect(), [userIdParamValidator])
  .get(validationMiddlware, secondLangProfs.getSecondLangProfs)
  .put(
    [updateSecondLangProfsValidator],
    validationMiddlware,
    sameUserMiddleware,
    secondLangProfs.setSecondLangProfs
  );

module.exports = secondLangProfsRouter;
