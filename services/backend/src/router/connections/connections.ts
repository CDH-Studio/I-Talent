import { Router } from "express";
import { keycloak } from "../../auth/keycloak";
import connections from "../../core/connections/connections";
import { UUIDValidator } from "./validator";

const connectionsRouter = Router();

connectionsRouter
  .route("/:id")
  .get(keycloak.protect(), UUIDValidator, connections.getConnectionById)
  .post(keycloak.protect(), UUIDValidator, connections.addConnection)
  .delete(keycloak.protect(), UUIDValidator, connections.removeConnection);

export default connectionsRouter;
