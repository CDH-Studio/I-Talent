const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const bugs = require("../../core/bugs/bugs");
const { createBugValidator } = require("./validator");

const bugsRoute = Router();

bugsRoute
  .route("/")
  .post(keycloak.protect(), createBugValidator, bugs.createBug)
  .get(keycloak.protect("view-admin-console"), bugs.getBugs);

module.exports = bugsRoute;
