const { query, param, body } = require("express-validator");
const { isUUID, isIn } = require("validator");
const moment = require("moment");

const langValidator = query("language")
  .trim()
  .isIn(["ENGLISH", "FRENCH"])
  .withMessage("must be 'ENGLISH' or 'FRENCH'");

const UUIDValidator = param("id").trim().isUUID().withMessage("must be a UUID");

const updateProfileStringBody = [
  "firstName",
  "lastName",
  "team",
  "telephone",
  "cellphone",
  "linkedin",
  "github",
  "gcconnex",
  "manager",
  "nameInitials",
  "avatarColor",
];

const updateProfileNumberBody = ["signupStep"];
const updateProfileStringArrayBody = ["projects"];
const updateProfileDateBody = ["actingStartDate", "actingEndDate"];

const updateProfileLanguageBody = [
  "firstLanguage",
  "secondLanguage",
  "preferredLanguage",
];

const updateProfileBooleanBody = [
  "interestedInRemote",
  "exFeeder",
  "mentoring",
];

const updateProfileUUIDArrayBody = [
  "skills",
  "mentorshipSkills",
  "competencies",
  "developmentalGoals",
  "relocationLocations",
];

const updateProfileUUIDBody = [
  "locationId",
  "careerMobilityId",
  "tenureId",
  "securityClearanceId",
  "lookingForANewJobId",
  "talentMatrixResultId",
  "groupLevelId",
  "actingLevelId",
  "employmentInfoId",
];

const updateProfileValidator = [
  langValidator,
  UUIDValidator,
  updateProfileStringBody.map((i) =>
    body(i).optional().isString().withMessage("must be a string")
  ),
  updateProfileNumberBody.map((i) =>
    body(i).optional().trim().isNumeric().withMessage("must be a number")
  ),
  updateProfileUUIDBody.map((i) =>
    body(i).optional().trim().isUUID().withMessage("must be a UUID")
  ),
  updateProfileDateBody.map((i) =>
    body(i)
      .optional()
      .trim()
      .custom((j) => moment(j).isValid())
      .withMessage("must be a date")
  ),
  updateProfileBooleanBody.map((i) =>
    body(i)
      .optional()
      .trim()
      .toBoolean(true)
      .isBoolean()
      .withMessage("must be a boolean")
  ),
  updateProfileLanguageBody.map((i) =>
    body(i)
      .optional()
      .trim()
      .isIn(["ENGLISH", "FRENCH"])
      .withMessage("must be 'ENGLISH' or 'FRENCH'")
  ),
  updateProfileStringArrayBody.map((i) =>
    body(i)
      .optional()
      .isArray()
      .custom((array) => array.every((j) => typeof j === "string"))
      .withMessage("must be a string array")
  ),
  updateProfileUUIDArrayBody.map((i) =>
    body(i)
      .optional()
      .isArray()
      .custom((array) => array.every((j) => isUUID(j)))
      .withMessage("must be a UUID array")
  ),
  body("secondLangProfs")
    .optional()
    .isArray()
    .custom((array) =>
      array.every(
        (i) =>
          isIn(i.level, ["A", "B", "C", "E", "X"]) &&
          isIn(i.proficiency, ["ORAL", "WRITING", "READING"]) &&
          ("date" in i ? true : moment(i.date).isValid())
      )
    )
    .withMessage(
      "must be an array of containing { proficiency: 'ORAL' | 'WRITING' | 'READING', level: 'A' | 'B' | 'C' | 'E' | 'X', date?: DateTime }"
    ),
  body("educations")
    .optional()
    .isArray()
    .custom((array) =>
      array.every(
        (i) =>
          isUUID(i.diplomaId) &&
          isUUID(i.schoolId) &&
          moment(i.startDate).isValid() &&
          ("endDate" in i ? true : moment(i.endDate).isValid())
      )
    )
    .withMessage(
      "must be an array of containing { diplomaId: UUID, schoolId: UUID, startDate: DateTime, endDate?: DateTime }"
    ),
  body("experiences")
    .optional()
    .isArray()
    .custom((array) =>
      array.every(
        (i) =>
          typeof i.description === "string" &&
          typeof i.jobTitle === "string" &&
          typeof i.organization === "string" &&
          moment(i.startDate).isValid() &&
          ("endDate" in i ? true : moment(i.endDate).isValid())
      )
    )
    .withMessage(
      "must be an array of containing { description: string, jobTitle: string, organization: string, startDate: DateTime, endDate?: DateTime }"
    ),
  body("status")
    .optional()
    .trim()
    .isIn(["ACTIVE", "INACTIVE", "HIDDEN"])
    .withMessage("must be 'ACTIVE' or 'INACTIVE' or 'HIDDEN'"),
];

module.exports = {
  langValidator,
  UUIDValidator,
  updateProfileValidator,
};
