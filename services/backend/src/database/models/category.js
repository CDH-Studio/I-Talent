module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    'category',
    {
      descriptionEn: DataTypes.STRING,
      descriptionFr: DataTypes.STRING,
    },
    {}
  );
  category.associate = function (models) {
    // associations can be defined here
    category.hasMany(models.skill); // allows us to get all skills for one category
  };
  return category;
};
