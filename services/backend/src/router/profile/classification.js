const { Router } = require("express");
const { classification } = require("../../core/profile");
const { keycloak } = require("../../auth/keycloak");

const classificationRouter = Router({ mergeParams: true });

classificationRouter
  .route("/")
  .all(keycloak.protect())
  .post(classification.setClassification)
  .delete(classification.removeClassification);

module.exports = classificationRouter;
