const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const user = require("../../core/user/user");
const { createUserValidator } = require("./validator");
const { UUIDValidator } = require("../util/commonValidators");
const { validationMiddlware } = require("../../utils/middlewares");

const userRouter = Router();

userRouter
  .route("/:id")
  .delete(
    keycloak.protect(),
    [UUIDValidator],
    validationMiddlware,
    user.deleteUser
  );

userRouter
  .route("/")
  // .all(keycloak.protect())
  .get(user.getCurrentUser)
  .post([createUserValidator], validationMiddlware, user.createUser);

module.exports = userRouter;
