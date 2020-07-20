const { validationResult } = require("express-validator");
const utils = require("./util");

async function fuzzySearch(request, response) {
  try {
    validationResult(request).throw();
    const userId = request.kauth.grant.access_token.content.sub;

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
    const userId = request.kauth.grant.access_token.content.sub;

    const {
      skills,
      name,
      branches,
      locations,
      classifications,
      exFeeder,
      language,
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
