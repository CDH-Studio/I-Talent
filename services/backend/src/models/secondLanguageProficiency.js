"use strict";
module.exports = (sequelize, DataTypes) => {
  const secondLanguageProficiency = sequelize.define(
    "secondLanguageProficiency",
    {
      readingProficiency: DataTypes.STRING,
      writingProficiency: DataTypes.STRING,
      oralProficiency: DataTypes.STRING,
      readingDate: DataTypes.DATE,
      writingDate: DataTypes.DATE,
      oralDate: DataTypes.DATE
    },
    {}
  );
  secondLanguageProficiency.associate = function(models) {
    secondLanguageProficiency.hasOne(models.profile);
  };
  return secondLanguageProficiency;
};
