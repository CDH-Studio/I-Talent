const { body, param } = require("express-validator");
const { isUUID, isIn, isMobilePhone } = require("validator");
const moment = require("moment");

const updateProfileEmploymentBody = ["jobTitle", "branch"];
const updateProfilePhoneNumberBody = ["telephone", "cellphone"];
const updateProfileNumberBody = ["signupStep"];
const updateProfileStringArrayBody = ["teams"];
const updateProfileDateBody = ["actingStartDate", "actingEndDate"];
const updateProfileOptionalLanguageBody = ["firstLanguage", "secondLanguage"];
const updateProfileLanguageBody = ["preferredLanguage"];
const updateProfileBooleanBody = ["interestedInRemote", "exFeeder"];
const updateProfileStringBody = [
  "firstName",
  "lastName",
  "linkedin",
  "github",
  "gcconnex",
  "manager",
  "description",
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
  body("status", "must be 'ACTIVE' or 'INACTIVE' or 'HIDDEN'")
    .optional()
    .trim()
    .isIn(["ACTIVE", "INACTIVE", "HIDDEN"]),
  body(
    "employmentEquityGroups",
    "must be 'WOMEN' | 'INDIGENOUS' | 'DISABILITY' | 'MINORITY'"
  )
    .optional()
    .trim()
    .isIn(["WOMEN", "INDIGENOUS", "DISABILITY", "MINORITY"]),
];

const idParamValidator = param("id", "must be a UUID").trim().isUUID();
const userIdParamValidator = param("userId", "must be a UUID").trim().isUUID();
const idsBodyValidator = body("ids", "must be an array of UUIDs")
  .isArray()
  .custom((array) => array.every((i) => isUUID(i)));

const createProfileValidator = [
  body("name", "must provide name").isString(),
  body("firstName", "must provide firstName").isString(),
  body("lastName", "must provide lastName").isString(),
  body("email", "must provide valid email").isEmail(),
];

const updateEducationValidator = body(
  "data",
  "must be an array of containing { diplomaId: UUID, schoolId: UUID, description?: string, startDate?: DateTime, endDate?: DateTime, ongoingDate: Boolean, attachmentLinks?: { nameId: UUID, url: string }[] }"
)
  .isArray()
  .custom((array) =>
    array.every(
      (i) =>
        isUUID(i.diplomaId) &&
        isUUID(i.schoolId) &&
        typeof i.ongoingDate === "boolean" &&
        ("description" in i ? typeof i.description === "string" : true) &&
        ("startDate" in i
          ? moment(i.startDate).isValid() || i.startDate === null
          : true) &&
        ("endDate" in i
          ? moment(i.endDate).isValid() || i.endDate === null
          : true) &&
        ("attachmentLinks" in i
          ? i.attachmentLinks.every(
              (j) => isUUID(j.nameID) && typeof j.url === "string"
            )
          : true)
    )
  );

const updateExperienceValidator = body(
  "data",
  "must be an array of containing { description?: string, jobTitle: string, organization: string, startDate?: DateTime, endDate?: DateTime, ongoingDate: Boolean, attachmentLinks?: { nameId: UUID, url: string }[] }"
)
  .isArray()
  .custom((array) =>
    array.every(
      (i) =>
        typeof i.organization === "string" &&
        typeof i.jobTitle === "string" &&
        typeof i.ongoingDate === "boolean" &&
        ("description" in i ? typeof i.organization === "string" : true) &&
        ("startDate" in i
          ? moment(i.startDate).isValid() || i.startDate === null
          : true) &&
        ("endDate" in i
          ? moment(i.endDate).isValid() || i.endDate === null
          : true) &&
        ("attachmentLinks" in i
          ? i.attachmentLinks.every(
              (j) => isUUID(j.nameID) && typeof j.url === "string"
            )
          : true)
    )
  );

const updateQualifiedPoolsValidator = body(
  "data",
  "must be an array of containing { classificationId: UUID, jobTitle: string, selectionProcessNumber: string, jobPosterLink: string }"
)
  .isArray()
  .custom((array) =>
    array.every(
      (i) =>
        isUUID(i.classificationId) &&
        typeof i.jobTitle === "string" &&
        typeof i.selectionProcessNumber === "string" &&
        typeof i.jobPosterLink === "string"
    )
  );

const updateSecondLangProfsValidator = body(
  "data",
  "must be an array of containing { proficiency: 'ORAL' | 'WRITING' | 'READING', level: 'A' | 'B' | 'C' | 'E' | 'X' | 'NA', date?: DateTime, unknownExpiredDate?: boolean }"
)
  .optional()
  .isArray()
  .custom((array) =>
    array.every(
      (i) =>
        isIn(i.level, ["A", "B", "C", "E", "X", "NA"]) &&
        isIn(i.proficiency, ["ORAL", "WRITING", "READING"]) &&
        ("date" in i ? i.date === null || moment(i.date).isValid() : true) &&
        ("unknownExpiredDate" in i
          ? typeof i.unknownExpiredDate === "boolean"
          : true)
    )
  );

const visibilityKeys = [
  "info",
  "talentManagement",
  "skills",
  "competencies",
  "developmentalGoals",
  "description",
  "officialLanguage",
  "qualifiedPools",
  "education",
  "experience",
  "careerInterests",
  "mentorshipSkills",
  "exFeeder",
  "employmentEquityGroup",
];
const updateVisibilityValidator = visibilityKeys.map((i) =>
  body(i, "must be 'PUBLIC' | 'CONNECTIONS' | 'PRIVATE'")
    .optional()
    .isIn(["PUBLIC", "CONNECTIONS", "PRIVATE"])
);

module.exports = {
  idParamValidator,
  userIdParamValidator,
  idsBodyValidator,
  createProfileValidator,
  updateEducationValidator,
  updateExperienceValidator,
  updateQualifiedPoolsValidator,
  updateSecondLangProfsValidator,
  updateVisibilityValidator,
  updateProfileValidator,
};
