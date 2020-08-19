const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const { filterSearch, fuzzySearch } = require("../../core/search/search");
const { langValidator } = require("../util/commonValidators");

const searchRouter = Router();

searchRouter.get("/filters", keycloak.protect(), langValidator, filterSearch);
searchRouter.get("/fuzzy", keycloak.protect(), langValidator, fuzzySearch);

module.exports = searchRouter;
