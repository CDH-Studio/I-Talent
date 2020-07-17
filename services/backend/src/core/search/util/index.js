const getAllProfiles = require("./getAllProfiles");
const fuzzySearch = require("./fuzzySearch");
const nameSearch = require("./nameSearch");
const exFeederSearch = require("./exFeederSearch");
const locationSearch = require("./locationSearch");
const classificationSearch = require("./classificationSearch");
const skillSearch = require("./skillSearch");
const branchSearch = require("./branchSearch");
const getSkillNames = require("./getSkillNames");
const cleanResults = require("./cleanResults");

module.exports = {
  getAllProfiles,
  fuzzySearch,
  nameSearch,
  exFeederSearch,
  locationSearch,
  classificationSearch,
  skillSearch,
  branchSearch,
  getSkillNames,
  cleanResults,
};
