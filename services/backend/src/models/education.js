module.exports = (sequelize, DataTypes) => {
  const education = sequelize.define(
    "education",
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {}
  );
  education.associate = function (models) {
    education.belongsTo(models.profile);
    education.belongsTo(models.school);
    education.belongsTo(models.diploma);
  };
  return education;
};
