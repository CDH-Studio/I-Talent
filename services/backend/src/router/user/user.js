const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const user = require("../../core/user/user");

const userRouter = Router();

userRouter.get("/check", keycloak.protect(), user.check);
userRouter.get("/", keycloak.protect(), user.getUser);
userRouter.get("/:id", keycloak.protect(), user.getUserById);
userRouter.post("/", keycloak.protect(), user.createUser);

module.exports = userRouter;
