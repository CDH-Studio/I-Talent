const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const user = require("../../core/user/user");
const { createUserValidator } = require("./validator");
const { UUIDValidator } = require("../util/commonValidators");

const userRouter = Router();

userRouter
  .route("/:id")
  .get(keycloak.protect(), [UUIDValidator], user.getUserById)
  .post(
    keycloak.protect(),
    [UUIDValidator, createUserValidator],
    user.createUser
  )
  .delete(keycloak.protect(), [UUIDValidator], user.deleteUser);

module.exports = userRouter;
