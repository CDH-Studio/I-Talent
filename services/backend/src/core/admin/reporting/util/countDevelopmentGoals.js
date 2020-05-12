const Models = require("../../../../database/models");

const { sequelize } = Models;
const getTopFive = require("./getTopFive");

// FIXME: Dont run inline query
async function countDevelopmentGoals() {
  const profileDevelopmentGoals = await sequelize.query(
    `SELECT 
          "skill"."id",
          "skill"."descriptionEn",
          "skill"."descriptionFr",
          COUNT("profiles"."id") AS "countOccurences"
        FROM "skills" AS "skill"
        LEFT OUTER JOIN (
              "profileDevelopmentGoals" AS "profiles->profileDevelopmentGoals"
              INNER JOIN "profiles" as "profiles" ON "profiles"."id" = "profiles->profileDevelopmentGoals"."profileId"
            ) ON "skill"."id" = "profiles->profileDevelopmentGoals"."skillId"
        GROUP BY
            "skill"."id"
        ORDER BY
            COUNT("profiles"."id") DESC;`
  );

  const topFiveDevelopmentGoals = getTopFive(profileDevelopmentGoals[0]);

  return topFiveDevelopmentGoals;
}

module.exports = countDevelopmentGoals;
