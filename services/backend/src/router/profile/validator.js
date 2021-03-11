const { body, param } = require("express-validator");
const { isUUID, isIn, isMobilePhone } = require("validator");
const moment = require("moment");

const updateProfilePhoneNumberBody = ["telephone", "cellphone"];
const updateProfilePRI = ["pri"];
const updateProfileNumberBody = ["signupStep"];
const updateProfileStringArrayBody = ["projects", "employmentEquityGroups"];
const updateProfileDateBody = ["actingStartDate", "actingEndDate"];
const updateProfileOptionalLanguageBody = ["firstLanguage", "secondLanguage"];
const updateProfileLanguageBody = ["preferredLanguage"];
const updateProfileBooleanBody = ["interestedInRemote", "exFeeder"];

const updateProfileStringBody = [
  "firstName",
  "lastName",
  "team",
  "linkedin",
  "github",
  "gcconnex",
  "manager",
  "avatarColor",
];

const updateProfileEmploymentBody = ["jobTitle", "branch"];
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
  updateProfileStringBody.map((i) =>
    body(i, "must be a string")
      .optional()
      .custom((value) => typeof value === "string" || value === null)
  ),
  updateProfileNumberBody.map((i) =>
    body(i, "must be a number").optional().trim().toInt().isNumeric()
  ),
  updateProfilePhoneNumberBody.map((i) =>
    body(i, "must be a valid phone number")
      .optional()
      .trim()
      .custom((value) => !value || isMobilePhone(value, "en-CA"))
  ),
  updateProfilePRI.map((i) =>
    body(i, "must be valid PRI")
      .optional()
      .trim()
      .custom((j) => j === null || (!Number.isNaN(j) && j.length === 8))
  ),
  updateProfileUUIDBody.map((i) =>
    body(i, "must be a UUID or null")
      .optional()
      .custom((value) => value === null || isUUID(value))
  ),
  updateProfileDateBody.map((i) =>
    body(i, "must be a date")
      .optional()
      .custom((j) => j === null || moment(j).isValid())
  ),
  updateProfileBooleanBody.map((i) =>
    body(i, "must be a boolean or null")
      .optional()
      .customSanitizer((j) => {
        switch (j) {
          case "true":
            return true;
          case "false":
            return false;
          case "null":
            return null;
          default:
            return j;
        }
      })
      .custom((j) => j === null || j === true || j === false)
      .withMessage()
  ),
  updateProfileLanguageBody.map((i) =>
    body(i, "must be 'ENGLISH' or 'FRENCH'")
      .optional()
      .trim()
      .isIn(["ENGLISH", "FRENCH"])
  ),
  updateProfileOptionalLanguageBody.map((i) =>
    body(i, "must be 'ENGLISH' or 'FRENCH' or null")
      .optional()
      .isIn(["ENGLISH", "FRENCH", null])
  ),
  updateProfileStringArrayBody.map((i) =>
    body(i, "must be a string array")
      .optional()
      .isArray()
      .custom((array) => array.every((j) => typeof j === "string"))
  ),
  updateProfileUUIDArrayBody.map((i) =>
    body(i, "must be a UUID array")
      .optional()
      .isArray()
      .custom((array) => array.every((j) => isUUID(j)))
  ),
  updateProfileEmploymentBody.map((i) =>
    body(i, "must be an object containing ENGLISH or/and FRENCH as keys")
      .optional()
      .custom(
        (object) =>
          typeof object === "object" &&
          Object.keys(object).every((key) =>
            ["ENGLISH", "FRENCH"].includes(key)
          )
      )
  ),
  body(
    "secondLangProfs",
    "must be an array of containing { proficiency: 'ORAL' | 'WRITING' | 'READING', level: 'A' | 'B' | 'C' | 'E' | 'X' | 'NA', date?: DateTime }"
  )
    .optional()
    .isArray()
    .custom((array) =>
      array.every(
        (i) =>
          isIn(i.level, ["A", "B", "C", "E", "X", "NA"]) &&
          isIn(i.proficiency, ["ORAL", "WRITING", "READING"]) &&
          ("date" in i ? i.date === null || moment(i.date).isValid() : true)
      )
    ),
  body(
    "qualifiedPools",
    "must be an array of containing { classificationId: UUID }"
  )
    .optional()
    .isArray()
    .custom((array) =>
      array.every(
        (i) =>
          isUUID(i.classificationId) &&
          typeof i.jobTitle === "string" &&
          typeof i.selectionProcessNumber === "string" &&
          typeof i.jobPosterLink === "string"
      )
    ),
  body(
    "educations",
    "must be an array of containing { diplomaId: UUID, schoolId: UUID, startDate?: DateTime, endDate?: DateTime, ongoingDate: Boolean }"
  )
    .optional()
    .isArray()
    .custom((array) =>
      array.every(
        (i) =>
          isUUID(i.diplomaId) &&
          isUUID(i.schoolId) &&
          typeof i.ongoingDate === "boolean" &&
          ("startDate" in i
            ? moment(i.startDate).isValid() || i.startDate === null
            : true) &&
          ("endDate" in i
            ? moment(i.endDate).isValid() || i.endDate === null
            : true)
      )
    ),
  body(
    "experiences",
    "must be an array of containing { description?: string, jobTitle: string, organization: string, startDate?: DateTime, endDate?: DateTime, ongoingDate: Boolean }"
  )
    .optional()
    .isArray()
    .custom((array) =>
      array.every(
        (i) =>
          typeof i.organization === "string" &&
          typeof i.jobTitle === "string" &&
          typeof i.ongoingDate === "boolean" &&
          ("description" in i ? typeof i.organization === "string" : true) &&
          ("startDate" in i ? moment(i.startDate).isValid() : true) &&
          ("endDate" in i ? moment(i.endDate).isValid() : true)
      )
    ),
  body("status", "must be 'ACTIVE' or 'INACTIVE' or 'HIDDEN'")
    .optional()
    .trim()
    .isIn(["ACTIVE", "INACTIVE", "HIDDEN"]),
];

const userIdParamValidator = param("userId", "must be a UUID").trim().isUUID();

module.exports = {
  userIdParamValidator,
  updateProfileValidator,
};
