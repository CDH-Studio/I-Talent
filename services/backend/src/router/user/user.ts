import { Router } from "express";
import { keycloak } from "../../auth/keycloak";
import user from "../../core/user/user";
import { UUIDValidator, createUserValidator } from "./validator";

const userRouter = Router();

userRouter
  .route("/:id")
  .get(keycloak.protect(), [UUIDValidator], user.getUserById)
  .post(keycloak.protect(), createUserValidator, user.createUser);

export default userRouter;
