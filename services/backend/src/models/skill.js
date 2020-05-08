module.exports = (sequelize, DataTypes) => {
  const skill = sequelize.define(
    "skill",
    {
      descriptionEn: DataTypes.STRING,
      descriptionFr: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {}
  );
  skill.associate = function (models) {
    skill.belongsToMany(models.profile, { through: "profileSkills" });
    skill.belongsToMany(models.profile, {
      through: "profileCompetencies",
      as: "competencies",
    });
    skill.belongsToMany(models.profile, {
      through: "profileDevelopmentGoals",
      as: "developmentGoals",
    });
    skill.belongsTo(models.category, { foreignKey: "categoryId" }); // allows us to get the category a skill belongs to
    skill.belongsToMany(models.profile, {
      through: "profileMentorshipSkills",
      as: "mentorshipSkills",
    });
  };
  return skill;
};
