module.exports = (sequelize, DataTypes) => {
  const talentMatrixResult = sequelize.define(
    'talentMatrixResult',
    {
      descriptionEn: DataTypes.STRING,
      descriptionFr: DataTypes.STRING,
    },
    {}
  );
  talentMatrixResult.associate = function (models) {
    talentMatrixResult.hasMany(models.profile);
  };
  return talentMatrixResult;
};
