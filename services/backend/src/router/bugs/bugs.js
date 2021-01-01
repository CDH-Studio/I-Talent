const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const { createBug, updateBug, getBugs } = require("../../core/bugs/bugs");
const { createBugValidator, updateBugValidator } = require("./validator");
const { UUIDValidator } = require("../util/commonValidators");
const { validationMiddleware } = require("../../utils/middleware");

const bugsRoute = Router();

bugsRoute
  .route("/")
  .post(keycloak.protect(), createBugValidator, validationMiddleware, createBug)
  .get(keycloak.protect("view-admin-console"), getBugs);

bugsRoute.put(
  "/:id",
  keycloak.protect("manage-options"),
  [updateBugValidator, UUIDValidator],
  validationMiddleware,
  updateBug
);

module.exports = bugsRoute;
