const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const user = require("../../core/user/user");
const { UUIDValidator, createUserValidator } = require("./validator");

const userRouter = Router();

userRouter.get("/", keycloak.protect(), user.getUsers);

userRouter
  .route("/:id")
  .get(keycloak.protect(), [UUIDValidator], user.getUserById)
  .post(keycloak.protect(), createUserValidator, user.createUser);

module.exports = userRouter;
