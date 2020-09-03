const { viewPrivateProfile } = require("../../../utils/keycloak");

/**
 * Hide information from the profile, regarding visible cards
 *
 * @param {Object} request
 * @param {Object} profileResult User object information - from the database
 * @param {string} userId User id making the request
 */
function filterProfileVisibility(request, profileResult, userId) {
  const result = {
    ...profileResult,
  };

  const isConnection = result.connections.some((item) => item.id === userId);

  var cardVisibilities = {
    info: true,
    talentManagement: true,
    officialLanguage: true,
    skills: true,
    competencies: true,
    developmentalGoals: true,
    description: true,
    education: true,
    experience: true,
    careerInterests: true,
    mentorshipSkills: true,
    exFeeder: true,
    employmentEquityGroup: true,
  };

  const isCardHidden = (key) =>
    (result.visibleCards[key] === "PRIVATE" ||
      (result.visibleCards[key] === "CONNECTIONS" && !isConnection)) &&
    !viewPrivateProfile(request);

  if (isCardHidden("info")) {
    // remove data from results
    result.employmentInfo = null;
    result.securityClearance = null;
    result.groupLevel = null;
    result.tenure = null;
    result.actingLevel = null;
    result.actingStartDate = null;
    result.actingEndDate = null;
    // set visibility
    cardVisibilities.info = false;
  }

  if (isCardHidden("talentManagement")) {
    // remove data from results
    result.careerMobility = null;
    result.talentMatrixResult = null;
    // set visibility
    cardVisibilities.talentManagement = false;
  }

  if (isCardHidden("description")) {
    // remove data from results
    result.description = null;
    // set visibility
    cardVisibilities.description = false;
  }

  if (isCardHidden("officialLanguage")) {
    // remove data from results
    result.firstLanguage = null;
    result.secondLanguage = null;
    result.secondLangProfs = null;
    // set visibility
    cardVisibilities.officialLanguage = false;

    // no idea why this is here
  } else if (result.secondLangProfs) {
    result.secondLangProfs.forEach((lang, index) => {
      delete result.secondLangProfs[index].date;
    });
  }

  if (isCardHidden("skills")) {
    // remove data from results
    result.skills = [];
    // set visibility
    cardVisibilities.skills = false;
  }
  if (isCardHidden("competencies")) {
    // remove data from results
    result.competencies = [];
    // set visibility
    cardVisibilities.competencies = false;
  }

  if (isCardHidden("mentorshipSkills")) {
    // remove data from results
    result.mentorshipSkills = [];
    // set visibility
    cardVisibilities.mentorshipSkills = false;
  }

  if (isCardHidden("developmentalGoals")) {
    // remove data from results
    result.developmentalGoals = [];
    // set visibility
    cardVisibilities.developmentalGoals = false;
  }

  if (isCardHidden("education")) {
    // remove data from results
    result.educations = [];
    // set visibility
    cardVisibilities.education = false;
  }

  if (isCardHidden("experience")) {
    // remove data from results
    result.experiences = [];
    // set visibility
    cardVisibilities.experience = false;
  }

  if (isCardHidden("employmentEquityGroup")) {
    // remove data from results
    result.employmentEquityGroups = [];
    // set visibility
    cardVisibilities.employmentEquityGroup = false;
  }

  if (isCardHidden("careerInterests")) {
    // remove data from results
    result.interestedInRemote = null;
    result.lookingJob = null;
    result.relocationLocations = null;
    // set visibility
    cardVisibilities.careerInterests = false;
  }

  if (isCardHidden("exFeeder")) {
    // remove data from results
    result.exFeeder = null;
    // set visibility
    cardVisibilities.exFeeder = false;
  }

  result.visibleCards = defaultCardVisibilities;

  return result;
}

module.exports = filterProfileVisibility;
