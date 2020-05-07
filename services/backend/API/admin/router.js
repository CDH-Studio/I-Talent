const { Router } = require("express");
const admin = require("./index");
const reporting = require("./reporting");
const { keycloak } = require("../../util/keycloak");

const catchAdminCheck = token => {
  let hasRole = false;
  try {
    hasRole = token.hasRole("view-admin-console");
  } catch (error) {
    return false;
  } finally {
    return hasRole;
  }
};

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

adminRouter.get(
  "/flagged/:id",
  keycloak.protect("view-admin-console"),
  admin.getFlagged
);
adminRouter.get(
  "/inactive/:id",
  keycloak.protect("view-admin-console"),
  admin.getInactive
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
  keycloak.protect(),
  admin.updateProfileStatus
);
adminRouter
  .route("/options/:type/:id")
  .put(keycloak.protect("manage-options"), admin.updateOption)
  .delete(keycloak.protect("manage-options"), admin.deleteOption);
adminRouter.put(
  "/flagged",
  keycloak.protect("manage-users"),
  admin.updateFlagged
);
adminRouter.put(
  "/inactive",
  keycloak.protect("manage-users"),
  admin.updateInactive
);

adminRouter.get("/dashboard", reporting.get.statistics);

module.exports = adminRouter;
