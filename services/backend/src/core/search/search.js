const { skill } = require("../../database/models");

const utils = require("./util");

// FIXME refactor this form
async function getSkillNames(searchSkill) {
	return Promise.all(
		searchSkill.map(async (skillId) => {
			const findSkills = await skill
				.findOne({ where: { id: skillId } })
				.then((data) => data.dataValues);

			return `${findSkills.descriptionEn}`;
		})
	);
}

async function search(request, response) {
	const { query } = request;

	const searchSkill = query.skills;

	let skillSearchValue = query.searchValue || "";

	if (searchSkill) {
		skillSearchValue = (
			await getSkillNames(searchSkill, skillSearchValue)
		).join(" ");
	}

	let results = await utils.getAllProfiles(skillSearchValue);

	if (query.searchValue)
		results = await utils.fuzzySearch(results, query.searchValue);

	if (query.skills) results = await utils.skillSearch(results, query.skills);

	if (query.name) results = await utils.nameSearch(results, query.name);

	if (query.branch) results = await utils.branchSearch(results, query.branch);

	if (query.location)
		results = await utils.locationSearch(results, query.location);

	if (query.classification)
		results = await utils.classificationSearch(results, query.classification);

	if (query.exFeeder === "true") results = utils.exFeederSearch(results);

	response.status(200).json(results);
}

module.exports = {
	search,
};
