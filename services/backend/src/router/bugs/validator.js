const { body } = require("express-validator");

const createBugValidator = [
  body("description").isString().withMessage("must provide description"),
  body("location")
    .isString()
    .isIn(["HOME", "PROFILE", "SEARCH", "FORMS"])
    .withMessage("must provide location"),
];

module.exports = {
  createBugValidator,
};
