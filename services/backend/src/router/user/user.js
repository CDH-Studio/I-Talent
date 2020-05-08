const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");

const { getUser, getUserById, createUser } = require("../../core/user/user");

const userRouter = Router();

userRouter.get("/", keycloak.protect(), getUser);
userRouter.get("/:id", keycloak.protect(), getUserById);
userRouter.post("/", keycloak.protect(), createUser);

module.exports = userRouter;
