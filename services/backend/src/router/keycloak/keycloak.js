const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const { getUsers } = require("../../core/keycloak/keycloak");
const { axiosErrorHandler } = require("../../utils/middlewares");

const keycloakRouter = Router();

keycloakRouter.get(
  "/users",
  keycloak.protect("view-admin-console"),
  axiosErrorHandler,
  getUsers
);

module.exports = keycloakRouter;
