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
    .isJSON()
    .custom((value) => {
      return Object.keys(value).every((i) => {
        return isUUID(i) && isIn(value[i], ["ACTIVE", "INACTIVE", "HIDDEN"]);
      });
    }),
];

module.exports = {
  langValidator,
  updateUserStatusValidator,
};
