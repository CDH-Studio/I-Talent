const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");

const connections = require("../../core/connections/connections");

const { UUIDValidator } = require("../util/commonValidators");
const { validationMiddlware } = require("../../utils/middleware");

const connectionsRouter = Router();

connectionsRouter
  .route("/:id")
  .all(keycloak.protect(), UUIDValidator, validationMiddlware)
  .get(connections.getConnectionById)
  .post(connections.addConnection)
  .delete(connections.removeConnection);

module.exports = connectionsRouter;
