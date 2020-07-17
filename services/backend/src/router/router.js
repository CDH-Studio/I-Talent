const { Router } = require("express");

const adminRouter = require("./admin/admin");
const optionsRouter = require("./options/options");
const profileRouter = require("./profile/profile");
const profileGenRouter = require("./geds/geds");
const searchRouter = require("./search/search");
const userRouter = require("./user/user");
const statsRouter = require("./statistics/statistics");
const connectionsRouter = require("./connections/connections");

const router = Router();

router.use("/admin/", adminRouter);
router.use("/option/", optionsRouter);
router.use("/profile/", profileRouter);
router.use("/profGen/", profileGenRouter);
router.use("/search/", searchRouter);
router.use("/user/", userRouter);
router.use("/stats/", statsRouter);
router.use("/connections/", connectionsRouter);

module.exports = router;
