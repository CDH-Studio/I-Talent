const { body } = require("express-validator");
const { isUUID, isIn } = require("validator");

const updateUserStatusValidator = [
  body()
    .custom((object) =>
      Object.keys(object).every(
        (key) =>
          isUUID(key) && isIn(object[key], ["ACTIVE", "INACTIVE", "HIDDEN"])
      )
    )
    .withMessage(
      "must be a JSON object with user UUIDs as keys and it's value must be 'ACTIVE' or 'INACTIVE' or 'HIDDEN'"
    ),
];

module.exports = {
  updateUserStatusValidator,
};
