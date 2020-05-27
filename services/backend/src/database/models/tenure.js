module.exports = (sequelize, DataTypes) => {
	const tenure = sequelize.define(
		"tenure",
		{
			descriptionEn: DataTypes.STRING,
			descriptionFr: DataTypes.STRING,
		},
		{}
	);
	tenure.associate = function (models) {
		tenure.hasMany(models.profile);
	};
	return tenure;
};
