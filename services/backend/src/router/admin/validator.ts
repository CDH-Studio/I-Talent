import { query, body } from "express-validator";
import validator from "validator";

const { isUUID, isIn } = validator;

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

export { langValidator, updateUserStatusValidator };
