const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const { getUsers, updateUserStatuses } = require("../../core/admin/users");
const { updateUserStatusValidator } = require("./validator");
const { langValidator } = require("../util/commonValidators");
const { validationMiddleware } = require("../../utils/middleware");

const adminRouter = Router();

adminRouter.get(
  "/users",
  keycloak.protect("view-admin-console"),
  langValidator,
  validationMiddleware,
  getUsers
);

adminRouter.put(
  "/userStatuses",
  keycloak.protect("manage-users"),
  updateUserStatusValidator,
  validationMiddleware,
  updateUserStatuses
);

module.exports = adminRouter;
