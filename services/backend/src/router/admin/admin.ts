import { Router } from "express";
import { keycloak } from "../../auth/keycloak";
import { getUsers, updateUserStatuses } from "../../core/admin/admin";
import { langValidator, updateUserStatusValidator } from "./validator";

const adminRouter = Router();

adminRouter.get(
  "/users",
  keycloak.protect("view-admin-console"),
  langValidator,
  getUsers
);

adminRouter.put(
  "/userStatuses",
  keycloak.protect("manage-users"),
  updateUserStatusValidator,
  updateUserStatuses
);

export default adminRouter;
