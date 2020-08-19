const { param, query } = require("express-validator");

const langValidator = [
  query("language")
    .trim()
    .isIn(["ENGLISH", "FRENCH"])
    .withMessage("must be 'ENGLISH' or 'FRENCH'"),
];

const UUIDValidator = param("id").trim().isUUID().withMessage("must be a UUID");

module.exports = {
  langValidator,
  UUIDValidator,
};
