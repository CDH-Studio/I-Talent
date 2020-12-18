const { Router } = require("express");

const { secondLangProfs } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");
const {
  sameUserMiddleware,
  validationMiddlware,
} = require("../../utils/middlewares");
const { userIdParamValidator } = require("./utils/validator");

const secondLangProfsRouter = Router({ mergeParams: true });

secondLangProfsRouter
  .route("/")
  .all(keycloak.protect(), [userIdParamValidator], validationMiddlware)
  .get(secondLangProfs.getSecondLangProfs)
  .put(sameUserMiddleware, secondLangProfs.setSecondLangProfs);

module.exports = secondLangProfsRouter;
