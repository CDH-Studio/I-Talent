const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const user = require("../../core/user/user");
const { createUserValidator } = require("./validator");
const { UUIDValidator } = require("../util/commonValidators");
const { validationMiddleware } = require("../../utils/middleware");

const userRouter = Router();

userRouter
  .route("/:id")
  .delete(
    keycloak.protect(),
    [UUIDValidator],
    validationMiddleware,
    user.deleteUser
  );

userRouter
  .route("/")
  .all(keycloak.protect())
  .get(user.getCurrentUser)
  .post([createUserValidator], validationMiddleware, user.createUser);

module.exports = userRouter;
