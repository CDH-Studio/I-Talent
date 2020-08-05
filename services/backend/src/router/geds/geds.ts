import { Router } from "express";
import { keycloak } from "../../auth/keycloak";
import profileGen from "../../core/geds/geds";
import { UUIDValidator } from "./validator";

const profileGenRouter = Router();

profileGenRouter.get(
  "/:id",
  keycloak.protect(),
  [UUIDValidator],
  profileGen.getGedsSetup
);

profileGenRouter.get(
  "/sync/:id",
  keycloak.protect(),
  [UUIDValidator],
  profileGen.getGedsSync
);

export default profileGenRouter;
