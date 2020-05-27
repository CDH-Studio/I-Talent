"use strict";
module.exports = (sequelize, DataTypes) => {
  const relocationLocation = sequelize.define("relocationLocation", {}, {});
  relocationLocation.associate = function(models) {
    relocationLocation.belongsTo(models.profile);
    relocationLocation.belongsTo(models.location);
  };
  return relocationLocation;
};
