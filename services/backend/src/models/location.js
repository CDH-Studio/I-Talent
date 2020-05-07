"use strict";

module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define(
    "location",
    {
      addressEn: DataTypes.STRING,
      addressFr: DataTypes.STRING,
      city: DataTypes.STRING,
      provinceEn: DataTypes.STRING,
      provinceFr: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {}
  );
  location.associate = function (models) {
    location.hasMany(models.profile);
    location.hasMany(models.relocationLocation);
  };
  return location;
};
