const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");

const connections = require("../../core/connections/connections");

const { UUIDValidator } = require("./validator");

const connectionsRouter = Router();

connectionsRouter
  .route("/:id")
  .get(keycloak.protect(), UUIDValidator, connections.getConnectionById)
  .post(keycloak.protect(), UUIDValidator, connections.addConnection)
  .delete(keycloak.protect(), UUIDValidator, connections.removeConnection);

module.exports = connectionsRouter;
