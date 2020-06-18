const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const user = require("../../core/user/user");

const userRouter = Router();

userRouter.get("/", keycloak.protect(), user.getUsers);

userRouter
  .route("/:id")
  .get(keycloak.protect(), user.getUserById)
  .post(keycloak.protect(), user.createUser);

userRouter.get("/checkExistence/:id", keycloak.protect(), user.checkExistence);

module.exports = userRouter;
