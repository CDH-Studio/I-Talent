const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const user = require("../../core/user/user");
const { createUserValidator } = require("./validator");
const { UUIDValidator } = require("../util/commonValidators");
const { validationMiddlware } = require("../../utils/middlewares");

const userRouter = Router();

userRouter
  .route("/:id")
  .all(keycloak.protect())
  .get([UUIDValidator], validationMiddlware, user.getUserById)
  .post(
    [UUIDValidator, createUserValidator],
    validationMiddlware,
    user.createUser
  )
  .delete([UUIDValidator], validationMiddlware, user.deleteUser);

module.exports = userRouter;
