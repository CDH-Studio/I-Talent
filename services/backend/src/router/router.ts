import { Router } from "express";

import adminRouter from "./admin/admin";
import optionsRouter from "./options/options";
import profileRouter from "./profile/profile";
import profileGenRouter from "./geds/geds";
import searchRouter from "./search/search";
import userRouter from "./user/user";
import statsRouter from "./statistics/statistics";
import connectionsRouter from "./connections/connections";
import keycloakRouter from "./keycloak/keycloak";

const router = Router();

router.use("/admin/", adminRouter);
router.use("/option/", optionsRouter);
router.use("/profile/", profileRouter);
router.use("/profGen/", profileGenRouter);
router.use("/search/", searchRouter);
router.use("/user/", userRouter);
router.use("/stats/", statsRouter);
router.use("/connections/", connectionsRouter);
router.use("/keycloak/", keycloakRouter);

export default router;
