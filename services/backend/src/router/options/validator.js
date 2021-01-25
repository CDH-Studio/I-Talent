const { body, query } = require("express-validator");
const { isUUID } = require("validator");

const deleteManyValidator = [
  body("ids", "must be an array of UUIDs").custom((array) => {
    if (Array.isArray(array)) {
      return array.every((i) => isUUID(i));
    }
    return false;
  }),
];

const deleteOneValidator = [body("id", "must be a UUID").trim().isUUID()];

const createValidator = [
  body("en").isString().trim(),
  body("fr").isString().trim(),
];
const updateValidator = [
  ...createValidator,
  body("id", "must be a UUID").isUUID(),
];

const schoolValidator = [
  body("abbrCountry", "must be a three letter abbreviation of the country")
    .trim()
    .isLength({ max: 3 }),
  body(
    "abbrProvince",
    "must be a two letter abbreviation of the province/state"
  )
    .trim()
    .isLength({ max: 3 }),
];
const createSchoolValidator = [
  body()
    .custom(
      ({ en, fr }) =>
        (en ? typeof en === "string" : true) &&
        (fr ? typeof fr === "string" : true)
    )
    .withMessage(
      "Must specify school name, either in english and/or in french"
    ),
  ...schoolValidator,
];
const updateSchoolValidator = [
  ...createSchoolValidator,
  body("id", "must be a UUID").isUUID(),
];

const skillValidator = body("categoryId", "must be a UUID").trim().isUUID();
const createSkillValidator = [...createValidator, skillValidator];
const updateSkillValidator = [...updateValidator, skillValidator];

const attachmentNameTypes = ["Edu", "Exp", "Dev"];

const attachmentNameValidator = query(
  "type",
  `most be in ${attachmentNameTypes}`
)
  .trim()
  .isIn(attachmentNameTypes);

module.exports = {
  deleteManyValidator,
  deleteOneValidator,
  createValidator,
  updateValidator,
  createSchoolValidator,
  updateSchoolValidator,
  createSkillValidator,
  updateSkillValidator,
  attachmentNameValidator,
};
