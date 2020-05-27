"use strict";
module.exports = (sequelize, DataTypes) => {
  const careerMobility = sequelize.define(
    "careerMobility",
    {
      descriptionEn: DataTypes.STRING,
      descriptionFr: DataTypes.STRING
    },
    {}
  );
  careerMobility.associate = function(models) {
    careerMobility.hasMany(models.profile);
  };
  return careerMobility;
};
