const { Router } = require("express");

const adminRouter = require("./admin/admin");
const optionsRouter = require("./options/options");
const profileRouter = require("./profile/profile");
const profileGenRouter = require("./profileGen/profileGen");
const searchRouter = require("./search/search");
const userRouter = require("./admin/admin");

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "hooray! welcome to our api!" });
});

router.use("/admin/", adminRouter);
router.use("/option/", optionsRouter);
router.get("/profile/", profileRouter);
router.get("/profGen/", profileGenRouter);
router.get("/search/", searchRouter);
router.get("/user/", userRouter);

module.exports = router;
