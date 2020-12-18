const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { talentMatrixResult } = require("../../core/profile");
const {
  validationMiddlware,
  sameUserMiddleware,
} = require("../../utils/middlewares");
const { idParamValidator, userIdParamValidator } = require("./utils/validator");

const talentMatrixResultRouter = Router({ mergeParams: true });

talentMatrixResultRouter.post(
  "/:id",
  keycloak.protect(),
  [idParamValidator, userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  talentMatrixResult.setTalentMatrixResult
);

talentMatrixResultRouter.delete(
  "/",
  keycloak.protect(),
  [userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  talentMatrixResult.removeTalentMatrixResult
);

module.exports = talentMatrixResultRouter;
