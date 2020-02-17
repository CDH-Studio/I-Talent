"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      inactive: DataTypes.BOOLEAN
    },
    {}
  );
  user.associate = function(models) {
    user.belongsTo(models.profile, {
      foreignKey: { fieldName: "id" }
    });
  };
  return user;
};
