const Sequelize = require("sequelize");
const Models = require("../../../../database/models");

const Skills = Models.skill; // Skills Table
const Profiles = Models.profile; // Profiles Table
const getTopFive = require("./getTopFive");

async function countSkillProfiles() {
  const profileSkills = await Skills.findAll({
    // {Skill ID (id) , descriptionEn, descriptionFr, Count Profile Occurences (countOccurences)}
    group: ["skill.id"],
    includeIgnoreAttributes: false,
    where: { type: "skill" },
    include: [
      {
        model: Profiles,
        attributes: ["id"],
      },
    ],
    attributes: [
      "id",
      "descriptionEn",
      "descriptionFr",
      [Sequelize.fn("COUNT", Sequelize.col("profiles.id")), "countOccurences"],
    ],
    order: [[Sequelize.fn("COUNT", Sequelize.col("profiles.id")), "DESC"]],
  });

  const topFiveSkills = getTopFive(profileSkills);

  return topFiveSkills;
}

module.exports = countSkillProfiles;
