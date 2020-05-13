const moment = require("moment");

const Profile = require("../../database/models");

async function getProfileById(request, response) {
	try {
		const { id } = request.params;

		const getProfile = await Profile.findOne({ where: { id: id } });
		if (!getProfile) {
			return response.status(404).json({
				status: "API Query Error",
				message: "User profile with the provided ID not found",
			});
		}

		const user = await getProfile.getUser();
		if (!user) {
			return response.status(404).json({
				status: "API Query Error",
				message: "User with the provided ID not found",
			});
		}

		const data = { ...getProfile.dataValues, ...user.dataValues };

		const [
			getTenure,
			getCareerMobility,
			getTalentMatrixResult,
			getGroupLevel,
			getSecurityClearance,
			getActing,
			getLocation,
			getExperiences,
			getProfileProjects,
			getEducation,
			getProfileOrganizations,
			getSkills,
			getCompetencies,
			getDevelopmentGoals,
			getMentorshipSkills,
			getSecondLanguageProficiency,
			getRelocationLocations,
			getLookingForANewJob,
		] = await Promise.all([
			getProfile.getTenure(),
			getProfile.getCareerMobility(),
			getProfile.getTalentMatrixResult(),
			getProfile.getGroupLevel(),
			getProfile.getSecurityClearance(),
			getProfile.getActing(),
			getProfile.getLocation(),
			getProfile.getExperiences({ order: [["startDate", "DESC"]] }),
			getProfile.getProfileProjects(),
			getProfile.getEducation({ order: [["startDate", "DESC"]] }),
			getProfile.getProfileOrganizations({ order: [["tier", "ASC"]] }),
			getProfile.getSkills(),
			getProfile.getCompetencies(),
			getProfile.getDevelopmentGoals(),
			getProfile.getMentorshipSkills(),
			getProfile.getSecondLanguageProficiency(),
			getProfile.getRelocationLocations(),
			getProfile.getLookingForANewJob(),
		]);

		response.status(200).json(Data);
	} catch (error) {
		// catch erro
		response.status(200).json();
	}
}
