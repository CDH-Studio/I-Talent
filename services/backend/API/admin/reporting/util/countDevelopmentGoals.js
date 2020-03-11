const Models = require("../../../../models");
const sequelize = Models.sequelize;

const countDevelopmentGoals = async () => {
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

  const topFiveDevelopmentGoals = [];

  profileDevelopmentGoals[0].slice(0, 5).forEach(goal => {
    topFiveDevelopmentGoals.push({
      description: { en: goal.descriptionEn, fr: goal.descriptionFr },
      count: parseInt(goal.countOccurences) ? parseInt(goal.countOccurences) : 0
    });
  });

  return topFiveDevelopmentGoals;
};

module.exports = countDevelopmentGoals;
