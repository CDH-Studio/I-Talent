import { Router } from "express";
import { keycloak } from "../../auth/keycloak";
import {
  addConnection,
  getConnectionById,
  removeConnection,
} from "../../core/connections/connections";
import { UUIDValidator } from "./validator";

const connectionsRouter = Router();

connectionsRouter
  .route("/:id")
  .get(keycloak.protect(), UUIDValidator, getConnectionById)
  .post(keycloak.protect(), UUIDValidator, addConnection)
  .delete(keycloak.protect(), UUIDValidator, removeConnection);

export default connectionsRouter;
