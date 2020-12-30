const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const bugs = require("../../core/bugs/bugs");
const { createBugValidator, updateBugValidator } = require("./validator");
const { UUIDValidator } = require("../util/commonValidators");
const { validationMiddleware } = require("../../utils/middleware");

const bugsRoute = Router();

bugsRoute
  .route("/")
  .post(
    keycloak.protect(),
    createBugValidator,
    validationMiddleware,
    bugs.createBug
  )
  .get(keycloak.protect("view-admin-console"), bugs.getBugs);

bugsRoute.put(
  "/:id",
  keycloak.protect("manage-options"),
  [updateBugValidator, UUIDValidator],
  validationMiddleware,
  bugs.updateBug
);

module.exports = bugsRoute;
