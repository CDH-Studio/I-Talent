const getAllProfiles = require("./getAllProfiles");
const fuzzySearch = require("./fuzzySearch");
const nameSearch = require("./nameSearch");
const exFeederSearch = require("./exFeederSearch");
const locationSearch = require("./locationSearch");
const classificationSearch = require("./classificationSearch");
const skillSearch = require("./skillSearch");
const branchSearch = require("./branchSearch");
const mentorshipSkillSearch = require("./mentorshipSkillSearch");
const anyMentorshipSkillsSearch = require("./anyMentorshipSkillsSearch");

module.exports = {
  getAllProfiles,
  fuzzySearch,
  nameSearch,
  exFeederSearch,
  locationSearch,
  classificationSearch,
  skillSearch,
  branchSearch,
  mentorshipSkillSearch,
  anyMentorshipSkillsSearch,
};
