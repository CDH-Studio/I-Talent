const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const admin = require("../../core/admin/admin");

const statistics = require("../../core/statistics");

function catchAdminCheck(token) {
  try {
    return token.hasRole("view-admin-console");
  } catch (error) {
    return false;
  }
}

const adminRouter = Router();

adminRouter.get("/user", keycloak.protect("view-admin-console"), admin.getUser);

adminRouter.get("/check", keycloak.protect(catchAdminCheck), admin.checkAdmin);

adminRouter.put(
  "/profileStatus",
  keycloak.protect("manage-users"),
  admin.updateProfileStatus
);

adminRouter.get("/dashboard", statistics.statistics);

module.exports = adminRouter;
