"use strict";

module.exports = (sequelize, DataTypes) => {
  const profileProject = sequelize.define(
    "profileProject",
    {
      description: DataTypes.STRING,
    },
    {}
  );
  profileProject.associate = function (models) {
    profileProject.belongsTo(models.profile);
  };
  return profileProject;
};
