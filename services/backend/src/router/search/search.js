const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");

const searchRouter = Router();

const { search } = require("../../core/search/search");

searchRouter.get("/fuzzySearch/", keycloak.protect(), search);

module.exports = searchRouter;
