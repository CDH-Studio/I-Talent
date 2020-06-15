const { query, body } = require("express-validator");
const { isUUID, isIn } = require("validator");

const langValidator = [
  query("language")
    .trim()
    .isIn(["ENGLISH", "FRENCH"])
    .withMessage("must be 'ENGLISH' or 'FRENCH'"),
];

const updateUserStatusValidator = [
  body()
    .custom((object) => {
      return Object.keys(object).every(
        (key) =>
          isUUID(key) && isIn(object[key], ["ACTIVE", "INACTIVE", "HIDDEN"])
      );
    })
    .withMessage(
      "must be a JSON object with user UUIDs as keys and it's value must be 'ACTIVE' or 'INACTIVE' or 'HIDDEN'"
    ),
];

module.exports = {
  langValidator,
  updateUserStatusValidator,
};
