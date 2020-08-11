const { validationResult } = require("express-validator");
const utils = require("./util");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function fuzzySearch(request, response) {
  try {
    validationResult(request).throw();
    const userId = getKeycloakUserId(request);

    const { language, searchValue } = request.query;

    const value = searchValue || "";

    const profiles = await utils.getAllProfiles(value, language, userId);
    const results = await utils.fuzzySearch(profiles, value);

    const responseData = utils.cleanResults(results);

    response.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error doing a fuzzy search");
  }
}

async function filterSearch(request, response) {
  try {
    validationResult(request).throw();
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

    let skillSearchValue = "";
    if (skills) {
      skillSearchValue = await utils.getSkillNames(skills);
    }

    let results = await utils.getAllProfiles(
      skillSearchValue,
      language,
      userId
    );

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
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error doing a filter search");
  }
}

module.exports = {
  fuzzySearch,
  filterSearch,
};
