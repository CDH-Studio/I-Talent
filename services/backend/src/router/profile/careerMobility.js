const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { careerMobility } = require("../../core/profile");
const {
  validationMiddlware,
  sameUserMiddleware,
} = require("../../utils/middlewares");
const { idParamValidator, userIdParamValidator } = require("./utils/validator");

const careerMobilityRouter = Router({ mergeParams: true });

careerMobilityRouter.post(
  "/:id",
  keycloak.protect(),
  [idParamValidator, userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  careerMobility.setCareerMobility
);

careerMobilityRouter.delete(
  "/",
  keycloak.protect(),
  [userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  careerMobility.removeCareerMobility
);

module.exports = careerMobilityRouter;
