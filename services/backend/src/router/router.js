const { Router } = require("express");

const adminRouter = require("./admin/admin");
const optionsRouter = require("./options/options");
const profileRouter = require("./profile/profile");
const profileGenRouter = require("./profileGen/profileGen");
const searchRouter = require("./search/search");
const userRouter = require("./user/user");
const apiTest = require("./api-test/api-test");

const router = Router();

router.use("/admin/", adminRouter);
router.use("/option/", optionsRouter);
router.use("/profile/", profileRouter);
router.use("/profGen/", profileGenRouter);
router.use("/search/", searchRouter);
router.use("/user/", userRouter);
router.use("/test/", apiTest);

module.exports = router;
