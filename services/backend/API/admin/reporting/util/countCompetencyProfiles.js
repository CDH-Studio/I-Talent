const Models = require("../../../../models");
const sequelize = Models.sequelize;

const countCompetencyProfiles = async () => {
  const profileCompetencies = await sequelize.query(
    `SELECT
        "skill"."id",
        "skill"."descriptionEn",
        "skill"."descriptionFr",
        COUNT("profiles"."id") AS "countOccurences"
      FROM "skills" AS "skill"
      LEFT OUTER JOIN (
          "profileCompetencies" AS "profiles->profileCompetencies"
          INNER JOIN "profiles" AS "profiles" ON "profiles"."id" = "profiles->profileCompetencies"."profileId"
        ) ON "skill"."id" = "profiles->profileCompetencies"."skillId"
      WHERE
        "skill"."type" = 'competency'
      GROUP BY
        "skill"."id"
      ORDER BY
        COUNT("profiles"."id") DESC;`
  );

  const topFiveCompetencies = [];

  profileCompetencies[0].slice(0, 5).forEach(comp => {
    topFiveCompetencies.push({
      description: { en: comp.descriptionEn, fr: comp.descriptionFr },
      count: parseInt(comp.countOccurences) ? parseInt(comp.countOccurences) : 0
    });
  });

  return topFiveCompetencies;
};

module.exports = countCompetencyProfiles;
