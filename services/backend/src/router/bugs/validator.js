const { body } = require("express-validator");

const createBugValidator = [
  body("description").isString().withMessage("must provide description"),
  body("location")
    .isString()
    .isIn(["HOME", "PROFILE", "SEARCH", "FORMS"])
    .withMessage("must provide location"),
];

const updateBugValidator = [
  body("description").optional().isString(),
  body("location")
    .optional()
    .isString()
    .isIn(["HOME", "PROFILE", "SEARCH", "FORMS"]),
  body("githubIssue").optional().isNumeric(),
  body("status").optional().isString().isIn(["UNRESOLVED", "RESOLVED"]),
];

module.exports = {
  createBugValidator,
  updateBugValidator,
};
