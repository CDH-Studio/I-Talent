const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { classification } = require("../../core/profile");
const {
  validationMiddlware,
  sameUserMiddleware,
} = require("../../utils/middlewares");
const { idParamValidator, userIdParamValidator } = require("./utils/validator");

const classificationRouter = Router({ mergeParams: true });

classificationRouter.post(
  "/:id",
  keycloak.protect(),
  [idParamValidator, userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  classification.setClassification
);

classificationRouter.delete(
  "/",
  keycloak.protect(),
  [userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  classification.removeClassification
);

module.exports = classificationRouter;
