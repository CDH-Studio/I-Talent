const { body } = require("express-validator");

const createBugValidator = [
  body("description").isString().withMessage("must provide description"),
  body("location")
    .isString()
    .isIn(["home", "profile", "search", "forms"])
    .withMessage("must provide firstName"),
];

module.exports = {
  createBugValidator,
};
