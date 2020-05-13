const moment = require("moment");

const Profile = require("../../database/models");

async function getProfileById(request, response) {
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

    const data = { 
        getProfile.dataValue};
    


    
}
