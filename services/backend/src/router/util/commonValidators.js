const { param, query } = require("express-validator");

const langValidator = [
  query("language", "must be 'ENGLISH' or 'FRENCH'")
    .trim()
    .isIn(["ENGLISH", "FRENCH"]),
];

const UUIDValidator = param("id", "must be a UUID").trim().isUUID();

module.exports = {
  langValidator,
  UUIDValidator,
};
