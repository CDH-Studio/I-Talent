const { query, body } = require("express-validator");
const { isUUID } = require("validator");

const langValidator = [
  query("language")
    .trim()
    .isIn(["ENGLISH", "FRENCH"])
    .withMessage("must be 'ENGLISH' or 'FRENCH'"),
];

const deleteManyValidator = [
  body("ids")
    .custom((value) => {
      const array = JSON.parse(value);
      if (Array.isArray(array)) {
        return array.every((i) => isUUID(i));
      }
      return false;
    })
    .withMessage("must be an array of UUIDs"),
];

const deleteOneValidator = [
  body("id").trim().isUUID().withMessage("must be a UUID"),
];

const createValidator = [body("en").trim(), body("fr").trim()];
const updateValidator = [
  ...createValidator,
  body("id").trim().isUUID().withMessage("must be a UUID"),
];

const schoolValidator = [
  body("abbrCountry")
    .trim()
    .isLength({ max: 3 })
    .withMessage("must be a three letter abbreviation of the country"),
  body("abbrProvince")
    .trim()
    .isLength({ max: 3 })
    .withMessage("must be a two letter abbreviation of the province/state"),
];
const createSchoolValidator = [...createValidator, ...schoolValidator];
const updateSchoolValidator = [...updateValidator, ...schoolValidator];

const skillValidator = body("categoryId")
  .trim()
  .isUUID()
  .withMessage("must be a UUID");
const createSkillValidator = [...createValidator, skillValidator];
const updateSkillValidator = [...updateValidator, skillValidator];

module.exports = {
  langValidator,
  deleteManyValidator,
  deleteOneValidator,
  createValidator,
  updateValidator,
  createSchoolValidator,
  updateSchoolValidator,
  createSkillValidator,
  updateSkillValidator,
};
