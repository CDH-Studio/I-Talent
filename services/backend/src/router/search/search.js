const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const { filterSearch, fuzzySearch } = require("../../core/search/search");
const { langValidator } = require("../util/commonValidators");
const { validationMiddlware } = require("../../utils/middlewares");

const searchRouter = Router();

searchRouter.get(
  "/filters",
  keycloak.protect(),
  langValidator,
  validationMiddlware,
  filterSearch
);
searchRouter.get(
  "/fuzzy",
  keycloak.protect(),
  langValidator,
  validationMiddlware,
  fuzzySearch
);

module.exports = searchRouter;
