const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const search = require("../../core/search/search");

const searchRouter = Router();

searchRouter.get("/fuzzySearch/", keycloak.protect(), search.search);

module.exports = searchRouter;
