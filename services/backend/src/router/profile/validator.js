const { query, param } = require("express-validator");
const { isUUID } = require("validator");

const langValidator = [
  query("language")
    .trim()
    .isIn(["ENGLISH", "FRENCH"])
    .withMessage("must be 'ENGLISH' or 'FRENCH'"),
];

const UUIDValidator = [
  param("id").trim().isUUID().withMessage("Must be a UUID"),
];

module.exports = {
  langValidator,
  UUIDValidator,
};
