const utils = require("./util");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function fuzzySearch(request, response) {
  const userId = getKeycloakUserId(request);

  const { language, searchValue } = request.query;

  const value = searchValue || "";

  const profiles = await utils.getAllProfiles(language, userId, request);

  const results = await utils.fuzzySearch(profiles, value);

  const responseData = utils.cleanResults(results);

  response.status(200).json(responseData);
}

async function filterSearch(request, response) {
  const userId = getKeycloakUserId(request);

  const {
    skills,
    name,
    branches,
    locations,
    classifications,
    exFeeder,
    language,
    mentorSkills,
    anyMentorSkills,
  } = request.query;

  let results = await utils.getAllProfiles(language, userId, request);

  if (skills) {
    results = await utils.skillSearch(results, skills);
  }

  if (name) {
    results = await utils.nameSearch(results, name);
  }

  if (branches) {
    results = await utils.branchSearch(results, branches);
  }

  if (locations) {
    results = await utils.locationSearch(results, locations);
  }

  if (classifications) {
    results = await utils.classificationSearch(results, classifications);
  }

  if (anyMentorSkills === "true") {
    results = await utils.anyMentorSkillsSearch(results);
  } else if (mentorSkills) {
    results = await utils.mentorSkillsSearch(results, mentorSkills);
  }

  if (exFeeder === "true") {
    results = utils.exFeederSearch(results);
  }

  const responseData = utils.cleanResults(results);

  response.status(200).json(responseData);
}

module.exports = {
  fuzzySearch,
  filterSearch,
};
