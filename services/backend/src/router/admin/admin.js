const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const admin = require("../../core/admin/index");

const statistics = require("../../core/statistics");

function catchAdminCheck(token) {
  try {
    return token.hasRole("view-admin-console");
  } catch (error) {
    return false;
  }
}

const adminRouter = Router();

adminRouter.get(
  "/options/:type",
  keycloak.protect("view-admin-console"),
  admin.getOption
);

adminRouter.get(
  "/options/categories/:type",
  keycloak.protect("view-admin-console"),
  admin.getCategories
);

adminRouter.get("/user", keycloak.protect("view-admin-console"), admin.getUser);

adminRouter.get("/check", keycloak.protect(catchAdminCheck), admin.checkAdmin);

adminRouter.post(
  "/options/:type",
  keycloak.protect("manage-options"),
  admin.createOption
);

adminRouter.post(
  "/delete/:type",
  keycloak.protect("manage-options"),
  admin.bulkDeleteOption
);

adminRouter.put(
  "/profileStatus",
  keycloak.protect("manage-users"),
  admin.updateProfileStatus
);

adminRouter
  .route("/options/:type/:id")
  .put(keycloak.protect("manage-options"), admin.updateOption)
  .delete(keycloak.protect("manage-options"), admin.deleteOption);

adminRouter.get("/dashboard", statistics.statistics);

module.exports = adminRouter;
