const { body } = require("express-validator");

const createBugValidator = [
  body("description", "must provide description").isString(),
  body("location", "must provide location")
    .isString()
    .isIn(["HOME", "PROFILE", "SEARCH", "FORMS"]),
];

const updateBugValidator = [
  body("description").optional().isString(),
  body("location")
    .optional()
    .isString()
    .isIn(["HOME", "PROFILE", "SEARCH", "FORMS"]),
  body("githubIssue").optional().isNumeric().toInt(),
  body("status")
    .optional()
    .isString()
    .isIn(["UNRESOLVED", "RESOLVED", "DUPLICATE"]),
];

module.exports = {
  createBugValidator,
  updateBugValidator,
};
