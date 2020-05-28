const { Router } = require("express");

const adminRouter = require("./admin/admin");
const optionsRouter = require("./options/options");
const profileRouter = require("./profile/profile");
const profileGenRouter = require("./profileGen/profileGen");
const searchRouter = require("./search/search");
const userRouter = require("./user/user");

const router = Router();

router.get("/", (req, res) => {
  console.log("hooray! welcome to our api!");
  res.json({ message: "hooray! welcome to our api!" });
});

router.use("/admin/", adminRouter);
router.use("/option/", optionsRouter);
router.use("/profile/", profileRouter);
router.use("/profGen/", profileGenRouter);
router.use("/search/", searchRouter);
router.use("/user/", userRouter);

module.exports = router;
