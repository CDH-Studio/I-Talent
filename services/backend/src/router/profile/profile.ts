import { Router } from "express";
import { keycloak } from "../../auth/keycloak";
import profile from "../../core/profile/profile";
import {
  langValidator,
  UUIDValidator,
  updateProfileValidator,
} from "./validator";

const profileRouter = Router();

profileRouter
  .route("/:id")
  .get(
    keycloak.protect(),
    [UUIDValidator, langValidator],
    profile.getPublicProfileById
  )
  .put(keycloak.protect(), updateProfileValidator, profile.updateProfile);

profileRouter
  .route("/private/:id")
  .get(
    keycloak.protect(),
    [UUIDValidator, langValidator],
    profile.getPrivateProfileById
  );

export default profileRouter;
