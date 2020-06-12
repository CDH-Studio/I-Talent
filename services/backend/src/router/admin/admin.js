const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const admin = require("../../core/admin/admin");

function catchAdminCheck(token) {
  try {
    return token.hasRole("view-admin-console");
  } catch (error) {
    return false;
  }
}

const adminRouter = Router();

adminRouter.get(
  "/users",
  keycloak.protect("view-admin-console"),
  admin.getUsers
);

adminRouter.get("/check", keycloak.protect(catchAdminCheck), admin.checkAdmin);

adminRouter.put(
  "/userStatuses",
  keycloak.protect("manage-users"),
  admin.updateUserStatuses
);

module.exports = adminRouter;
