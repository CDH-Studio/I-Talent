const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const {
  getCurrentUser,
  createUser,
  deleteUser,
} = require("../../core/user/user");
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
    deleteUser
  );

userRouter
  .route("/")
  .all(keycloak.protect())
  .get(getCurrentUser)
  .post([createUserValidator], validationMiddleware, createUser);

module.exports = userRouter;
