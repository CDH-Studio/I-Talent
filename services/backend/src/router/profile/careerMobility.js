const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { careerMobility } = require("../../core/profile");
const {
  validationMiddlware,
  sameUserMiddleware,
} = require("../../utils/middlewares");
const { idParamValidator, userIdParamValidator } = require("./utils/validator");

const careerMobilityRouter = Router({ mergeParams: true });

careerMobilityRouter
  .route("/")
  .all(keycloak.protect(), [idParamValidator])
  .post(
    [userIdParamValidator],
    validationMiddlware,
    sameUserMiddleware,
    careerMobility.setCareerMobility
  )
  .delete(
    validationMiddlware,
    sameUserMiddleware,
    careerMobility.removeCareerMobility
  );

module.exports = careerMobilityRouter;
