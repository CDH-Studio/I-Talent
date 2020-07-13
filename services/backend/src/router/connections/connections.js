const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");

const connections = require("../../core/connections/connections");

const { UUIDValidator } = require("./validator");

const connectionsRouter = Router();

connectionsRouter
  .route("/:id")
  .get(keycloak.protect(), UUIDValidator, connections.getFriendById)
  .post(keycloak.protect(), UUIDValidator, connections.addFriend)
  .delete(keycloak.protect(), UUIDValidator, connections.removeFriend);

module.exports = connectionsRouter;
