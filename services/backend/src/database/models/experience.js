module.exports = (sequelize, DataTypes) => {
	const experience = sequelize.define(
		"experience",
		{
			organization: DataTypes.STRING,
			jobTitle: DataTypes.STRING,
			description: DataTypes.TEXT,
			startDate: DataTypes.DATE,
			endDate: DataTypes.DATE,
		},
		{}
	);
	experience.associate = function (models) {
		experience.belongsTo(models.profile);
	};
	return experience;
};
