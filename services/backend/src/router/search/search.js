const { Router } = require("express");
const { fuzzyValidator } = require("./validator");
const { keycloak } = require("../../auth/keycloak");
const { filterSearch, fuzzySearch } = require("../../core/search/search");
const { langValidator } = require("../util/commonValidators");
const { validationMiddleware } = require("../../utils/middleware");

const searchRouter = Router();

searchRouter.get(
  "/filters",
  keycloak.protect(),
  langValidator,
  validationMiddleware,
  filterSearch
);
searchRouter.get(
  "/fuzzy",
  keycloak.protect(),
  [langValidator, fuzzyValidator],
  validationMiddleware,
  fuzzySearch
);

module.exports = searchRouter;
