const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const user = require("../../core/user/user");

const userRouter = Router();

userRouter.get("/", keycloak.protect(), user.getUsers);
userRouter.get("/:id", keycloak.protect(), user.getUserById);
userRouter.post("/", keycloak.protect(), user.createUser);

module.exports = userRouter;
