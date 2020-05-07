"use strict";

module.exports = (sequelize, DataTypes) => {
  const keyCompetency = sequelize.define(
    "keyCompetency",
    {
      descriptionEn: DataTypes.STRING,
      descriptionFr: DataTypes.STRING,
    },
    {}
  );
  keyCompetency.associate = function (models) {
    keyCompetency.hasMany(models.profile);
  };
  return keyCompetency;
};
