import { Router } from "express";
import { keycloak } from "../../auth/keycloak";
import { getUsers } from "../../core/keycloak/keycloak";

const keycloakRouter = Router();

keycloakRouter.get("/users", keycloak.protect("view-admin-console"), getUsers);

export default keycloakRouter;
