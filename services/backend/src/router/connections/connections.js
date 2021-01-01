const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");

const {
  getConnectionById,
  addConnection,
  removeConnection,
} = require("../../core/connections/connections");

const { UUIDValidator } = require("../util/commonValidators");
const { validationMiddleware } = require("../../utils/middleware");

const connectionsRouter = Router();

connectionsRouter
  .route("/:id")
  .all(keycloak.protect(), UUIDValidator, validationMiddleware)
  .get(getConnectionById)
  .post(addConnection)
  .delete(removeConnection);

module.exports = connectionsRouter;
