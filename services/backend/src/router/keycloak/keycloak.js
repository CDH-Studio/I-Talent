const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const { getUsers } = require("../../core/keycloak/keycloak");

const keycloakRouter = Router();

keycloakRouter.get("/users", keycloak.protect("view-admin-console"), getUsers);

module.exports = keycloakRouter;
