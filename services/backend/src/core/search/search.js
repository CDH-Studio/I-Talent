const { skill } = require("../../database/models");

const utils = require("./util");

// FIXME remove the await from inside the loop
async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index]);
	}
}

// FIXME refactor this form
async function getSkillNames(searchSkill, skillSearchValue) {
	await asyncForEach(searchSkill, async (skillId) => {
		let findSkills = await skill
			.findOne({ where: { id: skillId } })
			.then((data) => data.dataValues);

		findSkills = findSkills.descriptionEn;

		skillSearchValue = skillSearchValue.concat(` ${skill}`);
	});
	return skillSearchValue;
}

async function search(request, response) {
	const { query } = request;

	const searchSkill = query.skills;

	let skillSearchValue = query.searchValue || "";

	if (searchSkill) {
		skillSearchValue = await getSkillNames(searchSkill, skillSearchValue);
	}

	let results = await utils.getAllProfiles(skillSearchValue).then((res) => res);

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
