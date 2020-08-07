const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const user = require("../../core/user/user");
const { UUIDValidator, createUserValidator } = require("./validator");

const userRouter = Router();

userRouter
  .route("/:id")
  .get(keycloak.protect(), [UUIDValidator], user.getUserById)
  .post(keycloak.protect(), createUserValidator, user.createUser)
  .delete(keycloak.protect(), [UUIDValidator], user.deleteUser);

module.exports = userRouter;
