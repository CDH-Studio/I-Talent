const Sequelize = require("sequelize");
const Models = require("../../../../models");
const Skills = Models.skill; // Skills Table
const Profiles = Models.profile; // Profiles Table

const countSkillProfiles = async () => {
  const profileSkills = await Skills.findAll({
    // {Skill ID (id) , descriptionEn, descriptionFr, Count Profile Occurences (countOccurences)}
    group: ["skill.id"],
    includeIgnoreAttributes: false,
    where: { type: "skill" },
    include: [
      {
        model: Profiles,
        attributes: ["id"]
      }
    ],
    attributes: [
      "id",
      "descriptionEn",
      "descriptionFr",
      [Sequelize.fn("COUNT", Sequelize.col("profiles.id")), "countOccurences"]
    ],
    order: [[Sequelize.fn("COUNT", Sequelize.col("profiles.id")), "DESC"]]
  });

  const topFiveSkills = [];

  profileSkills.slice(0, 5).forEach(skill => {
    topFiveSkills.push({
      description: { en: skill.descriptionEn, fr: skill.descriptionFr },
      count: parseInt(skill.countOccurences)
        ? parseInt(skill.countOccurences)
        : 0
    });
  });

  return topFiveSkills;
};

module.exports = countSkillProfiles;
