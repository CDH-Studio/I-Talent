const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");

const searchRouter = Router();

searchRouter.get("/fuzzySearch/", keycloak.protect(), search);

module.exports = searchRouter;
