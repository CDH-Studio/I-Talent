const moment = require("moment");

const { profile } = require("../../database/models");

// FIXME: Refactor this
const getPrivateProfileById = async (request, response) => {
	const { id } = request.params;

	// get user profile
	const getProfile = await profile.findOne({ where: { id: id } });
	if (!getProfile) {
		return response.status(404).json({
			status: "API Query Error",
			message: "User profile with the provided ID not found",
		});
	}

	// get user info based on profile
	const user = await profile.getUser();
	if (!user) {
		return response.status(404).json({
			status: "API Query Error",
			message: "User with the provided ID not found",
		});
	}

	if (!getProfile) response.status(404).send("Profile Not Found");
	const data = { ...getProfile.dataValues, ...user.dataValues };

	// const tenure = await profile.getTenure().then((res) => {
	// 	if (res) return res.dataValues;
	// });

	// const careerMobility = await profile.getCareerMobility().then((res) => {
	// 	if (res) return res.dataValues;
	// });

	// const talentMatrixResult = await profile
	// 	.getTalentMatrixResult()
	// 	.then((res) => {
	// 		if (res) return res.dataValues;
	// 	});

	// const groupLevel = await profile.getGroupLevel().then((res) => {
	// 	if (res) return res.dataValues;
	// });

	// const securityClearance = await profile.getSecurityClearance().then((res) => {
	// 	if (res) return res.dataValues;
	// });

	// const acting = await profile.getActing().then((res) => {
	// 	if (res) return res.dataValues;
	// });

	// const location = await profile.getLocation().then((res) => {
	// 	if (res) return res.dataValues;
	// });

	// const experiences = await profile.getExperiences({
	// 	order: [["startDate", "DESC"]],
	// });

	const careerSummary = experiences.map((experience) => {
		const startDate = moment(experience.startDate);
		const endDate = moment(experience.endDate);

		return {
			subheader: experience.organization,
			header: experience.jobTitle,
			content: experience.description,
			startDate: startDate,
			endDate: endDate,
		};
	});

	// const dbProjects = await profile.getProfileProjects();
	const projects = dbProjects.map((project) => {
		return { text: project.description };
	});

	// const education = await profile.getEducation({
	// 	order: [["startDate", "DESC"]],
	// });
	const educations = () => {
		return Promise.all(
			education.map(async (educ) => {
				const startDate = moment(educ.startDate);
				const endDate = moment(educ.endDate);
				const school = await educ.getSchool().then((res) => {
					if (res) return res.dataValues;
				});
				const diploma = await educ.getDiploma().then((res) => {
					if (res) return res.dataValues;
				});
				educ = educ.dataValues;

				return {
					school: {
						id: school.id,
						description: { en: school.description, fr: school.description },
					},
					diploma: {
						id: diploma.id,
						description: {
							en: diploma.descriptionEn,
							fr: diploma.descriptionFr,
						},
					},
					content: "",
					startDate: { en: startDate, fr: startDate },
					endDate: { en: endDate, fr: endDate },
				};
			})
		);
	};

	const educArray = await educations();

	const organizationList = await profile
		.getProfileOrganizations({ order: [["tier", "ASC"]] })
		.then((organizations) => {
			const orgList = organizations.map((organization) => {
				return {
					en: organization.descriptionEn,
					fr: organization.descriptionFr,
				};
			});
			return orgList;
		});

	const skills = await profile.getSkills().map(async (skill) => {
		if (skill) {
			const cats = await skill.getCategory({
				attributes: ["descriptionEn", "descriptionFr", "id"],
				require: true,
			});

			return {
				id: skill.dataValues.id,
				description: {
					en: skill.dataValues.descriptionEn,
					fr: skill.dataValues.descriptionFr,
					category: {
						en: cats.dataValues.descriptionEn,
						fr: cats.dataValues.descriptionFr,
					},
					categoryId: skill.dataValues.categoryId,
				},
			};
		}
	});

	const competencies = await profile.getCompetencies().map((competency) => {
		if (competency)
			return {
				id: competency.dataValues.id,
				description: {
					en: competency.dataValues.descriptionEn,
					fr: competency.dataValues.descriptionFr,
				},
			};
	});

	const developmentalGoals = await profile.getDevelopmentGoals().map((goal) => {
		if (goal)
			return {
				id: goal.dataValues.id,
				description: {
					en: goal.dataValues.descriptionEn,
					fr: goal.dataValues.descriptionFr,
				},
			};
	});

	const mentorshipSkills = await profile
		.getMentorshipSkills()
		.map(async (mentorshipSkill) => {
			if (mentorshipSkill) {
				const cats = await mentorshipSkill.getCategory({
					attributes: ["descriptionEn", "descriptionFr", "id"],
					require: true,
				});

				return {
					id: mentorshipSkill.dataValues.id,
					description: {
						en: mentorshipSkill.dataValues.descriptionEn,
						fr: mentorshipSkill.dataValues.descriptionFr,
						category: {
							en: cats.dataValues.descriptionEn,
							fr: cats.dataValues.descriptionFr,
						},
						categoryId: mentorshipSkill.dataValues.categoryId,
					},
				};
			}
		});

	const secLangProf = await profile
		.getSecondLanguageProficiency()
		.then((res) => {
			if (res) return res.dataValues;
			return null;
		});

	const relocationLocations = await profile
		.getRelocationLocations()
		.then((relocs) =>
			Promise.all(
				relocs.map((element) =>
					element.getLocation().then((loc) => ({
						description: {
							en: `${loc.city}, ${loc.provinceEn}`,
							fr: `${loc.city}, ${loc.provinceFr}`,
						},
						id: element.id,
						locationId: loc.id,
					}))
				)
			)
		);

	const lookingForNewJob = await profile
		.getLookingForANewJob()
		.then((value) => {
			if (!value) {
				return null;
			}
			return {
				id: value.id,
				description: { en: value.descriptionEn, fr: value.descriptionFr },
			};
		});

	// Response Object
	const resData = {
		visibleCards: data.visibleCards,
		acting: {
			id: acting ? acting.id : null,
			description: acting ? acting.description : null,
		},
		actingPeriodStartDate: data.actingStartDate,
		actingPeriodEndDate: data.actingEndDate,
		branch: { en: data.branchEn, fr: data.branchFr },
		careerMobility: {
			id: careerMobility ? careerMobility.id : null,
			description: {
				en: careerMobility ? careerMobility.descriptionEn : null,
				fr: careerMobility ? careerMobility.descriptionFr : null,
			},
		},
		careerSummary,
		competencies,
		developmentalGoals,
		education: educArray,
		email: data.email,
		exFeeder: data.exFeeder,
		isMentor: data.isMentor,
		flagged: data.flagged,
		firstLanguage: {
			fr: { en: "French", fr: "Français" },
			en: { en: "English", fr: "Anglais" },
		}[data.firstLanguage],
		firstName: data.firstName,
		lastName: data.lastName,
		avatarColor: data.avatarColor,
		nameInitials: data.nameInitials,
		githubUrl: data.github,
		gradedOnSecondLanguage: true,
		classification: {
			id: groupLevel ? groupLevel.id : null,
			description: groupLevel ? groupLevel.description : null,
		},
		jobTitle: { en: data.jobTitleEn, fr: data.jobTitleFr },

		linkedinUrl: data.linkedin,
		location: {
			id: location ? location.id : null,
			description: {
				en: location
					? `${location.addressEn}, ${location.city}, ${location.provinceEn}`
					: null,
				fr: location
					? `${location.addressFr}, ${location.city}, ${location.provinceFr}`
					: null,
			},
		},

		manager: data.manager,
		cellphone: data.cellphone,
		organizationList,
		secondaryOralDate: secLangProf ? secLangProf.oralDate : null,
		secondaryOralProficiency: secLangProf ? secLangProf.oralProficiency : null,
		secondaryReadingDate: secLangProf ? secLangProf.readingDate : null,
		secondaryReadingProficiency: secLangProf
			? secLangProf.readingProficiency
			: null,
		secondaryWritingDate: secLangProf ? secLangProf.writingDate : null,
		secondaryWritingProficiency: secLangProf
			? secLangProf.writingProficiency
			: null,
		secondLanguage: null,
		security: {
			id: securityClearance ? securityClearance.id : null,
			description: {
				en: securityClearance ? securityClearance.descriptionEn : null,
				fr: securityClearance ? securityClearance.descriptionFr : null,
			},
		},
		// categories,
		skills,
		mentorshipSkills,
		temporaryRole: {
			id: tenure ? tenure.id : null,
			description: {
				en: tenure ? tenure.descriptionEn : null,
				fr: tenure ? tenure.descriptionFr : null,
			},
		},
		talentMatrixResult: {
			id: talentMatrixResult ? talentMatrixResult.id : null,
			description: {
				en: talentMatrixResult ? talentMatrixResult.descriptionEn : null,
				fr: talentMatrixResult ? talentMatrixResult.descriptionFr : null,
			},
		},
		team: data.team,
		telephone: data.telephone,
		gcconnexUrl: data.gcconnex,
		projects: projects,
		interestedInRemote: data.interestedInRemote,
		relocationLocations: relocationLocations,
		lookingForNewJob: lookingForNewJob,
		indeterminate: data.indeterminate,
	};
	console.log("private function called", resData);

	response.status(200).json(resData);
};

module.exports = {
	getPrivateProfileById,
};
