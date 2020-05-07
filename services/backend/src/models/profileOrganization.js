"use strict";
module.exports = (sequelize, DataTypes) => {
  const profileOrganization = sequelize.define(
    "profileOrganization",
    {
      descriptionEn: DataTypes.STRING,
      descriptionFr: DataTypes.STRING,
      tier: DataTypes.INTEGER
    },
    {}
  );
  profileOrganization.associate = function(models) {
    profileOrganization.belongsTo(models.profile, {
      onDelete: "CASCADE"
    });
  };
  return profileOrganization;
};
