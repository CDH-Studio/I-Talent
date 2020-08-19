const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const admin = require("../../core/admin/admin");
const { updateUserStatusValidator } = require("./validator");
const { langValidator } = require("../util/commonValidators");

const adminRouter = Router();

adminRouter.get(
  "/users",
  keycloak.protect("view-admin-console"),
  langValidator,
  admin.getUsers
);

adminRouter.put(
  "/userStatuses",
  keycloak.protect("manage-users"),
  updateUserStatusValidator,
  admin.updateUserStatuses
);

module.exports = adminRouter;
