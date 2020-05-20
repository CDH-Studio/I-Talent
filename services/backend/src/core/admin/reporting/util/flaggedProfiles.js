const Models = require("../../../../database/models");

const Profiles = Models.profile;
async function flaggedProfiles() {
	const flag = await Profiles.findAll({
		where: { flagged: true },
		attributes: ["id", "firstName", "lastName"],
	});
	return flag;
}

module.exports = flaggedProfiles;
