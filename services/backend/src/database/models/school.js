module.exports = (sequelize, DataTypes) => {
	const school = sequelize.define(
		"school",
		{
			country: DataTypes.STRING,
			state: { type: DataTypes.STRING, allowNull: true },
			description: DataTypes.STRING,
		},
		{}
	);
	school.associate = function (models) {
		school.hasMany(models.education);
	};
	return school;
};
