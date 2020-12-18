const { Router } = require("express");

const adminRouter = require("./admin/admin");
const optionsRouter = require("./options/options");
const profileRouter = require("./profile");
const profileGenRouter = require("./geds/geds");
const searchRouter = require("./search/search");
const statsRouter = require("./statistics/statistics");
const connectionsRouter = require("./connections/connections");
const keycloakRouter = require("./keycloak/keycloak");
const bugsRouter = require("./bugs/bugs");

const router = Router();

router.use("/admin/", adminRouter);
router.use("/option/", optionsRouter);
router.use("/profile/", profileRouter);
router.use("/profGen/", profileGenRouter);
router.use("/search/", searchRouter);
router.use("/stats/", statsRouter);
router.use("/connections/", connectionsRouter);
router.use("/keycloak/", keycloakRouter);
router.use("/bugs/", bugsRouter);

module.exports = router;
