const Sequelize = require("sequelize");
const Models = require("../../database/models");

const Profile = Models.profile;
const CareerMobility = Models.careerMobility;
const Category = Models.category;
const Diploma = Models.diploma;
const GroupLevel = Models.groupLevel;
const KeyCompetency = Models.keyCompetency;
const Location = Models.location;
const School = Models.school;
const SecurityClearance = Models.securityClearance;
const Skill = Models.skill;
const TalentMatrixResult = Models.talentMatrixResult;
const Tenure = Models.tenure;
const LookingForANewJob = Models.lookingForANewJob;

async function getBranch(request, response) {
	const all = await Profile.findAll({
		attributes: [
			[Sequelize.fn("DISTINCT", Sequelize.col("branchEn")), "branchEn"],
			"branchFr",
		],
	});

	const resBody = all.map((one) => {
		one = one.dataValues;
		return {
			description: { en: one.branchEn, fr: one.branchFr },
		};
	});
	response.status(200).json(resBody);
}

async function getCareerMobility(request, response) {
	const all = await CareerMobility.findAll();
	const resBody = all.map((one) => {
		one = one.dataValues;
		return {
			id: one.id,
			description: { en: one.descriptionEn, fr: one.descriptionFr },
		};
	});
	response.status(200).json(resBody);
}

async function getCompetency(request, response) {
	const all = await Skill.findAll({
		where: {
			type: "competency",
		},
	});
	const resBody = all.map((one) => {
		one = one.dataValues;
		return {
			id: one.id,
			description: { en: one.descriptionEn, fr: one.descriptionFr },
		};
	});
	response.status(200).json(resBody);
}

async function getDevelopmentalGoals(request, response) {
	const all = await Skill.findAll();
	const resBody = all.map((one) => {
		one = one.dataValues;
		return {
			id: one.id,
			description: { en: one.descriptionEn, fr: one.descriptionFr },
		};
	});
	response.status(200).json(resBody);
}

async function getDiploma(request, response) {
	const all = await Diploma.findAll();
	const resBody = all.map((one) => {
		one = one.dataValues;
		return {
			id: one.id,
			description: { en: one.descriptionEn, fr: one.descriptionFr },
		};
	});
	response.status(200).json(resBody);
}

async function getGroupLevel(request, response) {
	const all = await GroupLevel.findAll();
	const resBody = all.map((one) => {
		one = one.dataValues;
		return {
			id: one.id,
			description: one.description,
		};
	});
	response.status(200).json(resBody);
}

async function getKeyCompetency(request, response) {
	const all = await KeyCompetency.findAll();
	const resBody = all.map((one) => {
		one = one.dataValues;
		return {
			id: one.id,
			description: { en: one.descriptionEn, fr: one.descriptionFr },
		};
	});
	response.status(200).json(resBody);
}

async function getLocation(request, response) {
	const all = await Location.findAll();
	const resBody = all.map((one) => {
		one = one.dataValues;
		return {
			id: one.id,
			description: {
				en: `${one.addressEn}, ${one.city}, ${one.provinceEn}`,
				fr: `${one.addressFr}, ${one.city}, ${one.provinceFr}`,
			},
		};
	});
	response.status(200).json(resBody);
}

async function getSchool(request, response) {
	const all = await School.findAll();
	const resBody = all.map((one) => {
		one = one.dataValues;
		return {
			id: one.id,
			description: one.description,
		};
	});
	response.status(200).json(resBody);
}

async function getSecurityClearance(request, response) {
	const all = await SecurityClearance.findAll();
	const resBody = all.map((one) => {
		one = one.dataValues;
		return {
			id: one.id,
			description: { en: one.descriptionEn, fr: one.descriptionFr },
		};
	});
	response.status(200).json(resBody);
}

async function getCategorySkills(request, response) {
	const all = await Category.findAll({
		include: Skill,
		attributes: ["descriptionEn", "descriptionFr", "id"],
		require: true,
	});
	const resBody = all.map((one) => {
		one = one.dataValues;
		const skillsList = one.skills.map((skillCat) => {
			skillCat = skillCat.dataValues;
			if (skillCat.categoryId == one.id) {
				return {
					id: skillCat.id,
					description: {
						en: skillCat.en,
						fr: skillCat.fr,
					},
				};
			}
			return {
				id: skillCat.id,
				description: { en: null, fr: null },
			};
		});
		return {
			aCategory: {
				category: {
					id: one.id,
					description: { en: one.descriptionEn, fr: one.descriptionFr },
					skillsList,
				},
			},
		};
	});
	response.status(200).json(resBody);
}

async function getCategory(request, response) {
	const all = await Category.findAll({
		include: Skill,
		attributes: ["descriptionEn", "descriptionFr", "id"],
		require: true,
	});
	const resBody = all.map((one) => {
		one = one.dataValues;
		const skillsCat = one.skills.map((skillCat) => {
			skillCat = skillCat.dataValues;
			if (skillCat.categoryId == one.id) {
				return {
					id: skillCat.id,
					description: {
						en: skillCat.descriptionEn,
						fr: skillCat.descriptionFr,
					},
				};
			}
			return {
				id: skillCat.id,
				description: { en: null, fr: null },
			};
		});
		return {
			id: one.id,
			description: {
				en: one.descriptionEn,
				fr: one.descriptionFr,
			},
			skills: skillsCat,
		};
	});
	response.status(200).json(resBody);
}

async function getSkill(request, response) {
	const all = await Skill.findAll({
		include: Category,
		attributes: ["descriptionEn", "descriptionFr", "id"],
		require: true,
		where: {
			type: "skill",
		},
	});
	const resBody = all.map((one) => {
		one = one.dataValues;

		const ascCats = one.category.dataValues;
		return {
			id: one.id,
			description: {
				en: one.descriptionEn,
				fr: one.descriptionFr,
			},
		};
	});
	response.status(200).json(resBody);
}

async function getTalentMatrixResult(request, response) {
	const all = await TalentMatrixResult.findAll();
	const resBody = all.map((one) => {
		one = one.dataValues;
		return {
			id: one.id,
			description: { en: one.descriptionEn, fr: one.descriptionFr },
		};
	});
	response.status(200).json(resBody);
}

async function getTenure(request, response) {
	const all = await Tenure.findAll();
	const resBody = all.map((one) => {
		one = one.dataValues;
		return {
			id: one.id,
			description: { en: one.descriptionEn, fr: one.descriptionFr },
		};
	});
	response.status(200).json(resBody);
}

async function getLookingForANewJob(request, response) {
	try {
		const all = await LookingForANewJob.findAll();
		const resBody = all.map((element) => ({
			id: element.id,
			description: {
				en: element.descriptionEn,
				fr: element.descriptionFr,
			},
		}));
		response.status(200).json(resBody);
	} catch (error) {
		response.status(500).json(error.message);
	}
}

async function getWillingToRelocateTo(request, response) {
	try {
		const all = await Location.findAll({
			attributes: [
				[
					Sequelize.fn("MIN", Sequelize.cast(Sequelize.col("id"), "varchar")),
					"id",
				],
				"city",
				"provinceEn",
				"provinceFr",
			],
			group: ["city", "provinceEn", "provinceFr"],
			order: [
				["provinceEn", "ASC"],
				["city", "ASC"],
			],
		});
		const resBody = all.map((one) => {
			one = one.dataValues;
			return {
				id: one.id,
				description: {
					en: `${one.city}, ${one.provinceEn}`,
					fr: `${one.city}, ${one.provinceFr}`,
				},
			};
		});
		response.status(200).json(resBody);
	} catch (error) {
		response.status(500).json(error.message);
	}
}

module.exports = {
	getBranch,
	getCareerMobility,
	getCompetency,
	getDevelopmentalGoals,
	getDiploma,
	getGroupLevel,
	getKeyCompetency,
	getLocation,
	getCategory,
	getSchool,
	getSecurityClearance,
	getCategorySkills,
	getSkill,
	getTalentMatrixResult,
	getTenure,
	getLookingForANewJob,
	getWillingToRelocateTo,
};
