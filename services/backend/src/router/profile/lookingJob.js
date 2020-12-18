const { Router } = require("express");

const { keycloak } = require("../../auth/keycloak");
const { lookingJob } = require("../../core/profile");
const {
  validationMiddlware,
  sameUserMiddleware,
} = require("../../utils/middlewares");
const { idParamValidator, userIdParamValidator } = require("./utils/validator");

const lookingJobRouter = Router({ mergeParams: true });

lookingJobRouter.post(
  "/:id",
  keycloak.protect(),
  [idParamValidator, userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  lookingJob.setLookingJob
);

lookingJobRouter.delete(
  "/",
  keycloak.protect(),
  [userIdParamValidator],
  validationMiddlware,
  sameUserMiddleware,
  lookingJob.removeLookingJob
);

module.exports = lookingJobRouter;
