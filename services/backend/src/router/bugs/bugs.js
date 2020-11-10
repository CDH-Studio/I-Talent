const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const bugs = require("../../core/bugs/bugs");
const { createBugValidator, updateBugValidator } = require("./validator");
const { UUIDValidator } = require("../util/commonValidators");

const bugsRoute = Router();

bugsRoute
  .route("/")
  .post(keycloak.protect(), createBugValidator, bugs.createBug)
  .get(keycloak.protect("view-admin-console"), bugs.getBugs);

bugsRoute
  .route("/:id")
  .put(keycloak.protect(), [updateBugValidator, UUIDValidator], bugs.updateBug);

module.exports = bugsRoute;
