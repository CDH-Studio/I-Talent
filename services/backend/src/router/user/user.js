const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");

const { getUser, getUserById, createUser } = require("../../core/user/user");

const userRouter = Router();

userRouter.get("/user/", keycloak.protect(), getUser);
userRouter.get("/user/:id", keycloak.protect(), getUserById);
userRouter.post("/user/", keycloak.protect(), createUser);

module.exports = userRouter;
