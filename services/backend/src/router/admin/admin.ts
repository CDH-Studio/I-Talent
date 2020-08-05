import { Router } from "express";
import { keycloak } from "../../auth/keycloak";
import admin from "../../core/admin/admin";
import { langValidator, updateUserStatusValidator } from "./validator";

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

export default adminRouter;
