const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const user = require("../../core/user/user");
const { createUserValidator } = require("./validator");
const { validationMiddlware } = require("../../utils/middlewares");

const userRouter = Router();

userRouter
  .route("/")
  .all(keycloak.protect())
  .get(user.getCurrentUser)
  .post([createUserValidator], validationMiddlware, user.createUser);

module.exports = userRouter;
