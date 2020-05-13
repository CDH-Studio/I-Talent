module.exports = (sequelize, DataTypes) => {
	const lookingForANewJob = sequelize.define(
		"lookingForANewJob",
		{
			descriptionEn: DataTypes.STRING,
			descriptionFr: DataTypes.STRING,
		},
		{}
	);
	lookingForANewJob.associate = function (models) {
		lookingForANewJob.hasMany(models.profile);
	};
	return lookingForANewJob;
};
