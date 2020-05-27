module.exports = (sequelize, DataTypes) => {
	const diploma = sequelize.define(
		"diploma",
		{
			descriptionEn: DataTypes.STRING,
			descriptionFr: DataTypes.STRING,
		},
		{}
	);
	diploma.associate = function (models) {
		diploma.hasMany(models.education);
	};
	return diploma;
};
