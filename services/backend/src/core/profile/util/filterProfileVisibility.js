const { viewPrivateProfile } = require("../../../utils/keycloak");

/**
 * Filter profile information based on user access permission
 * Set convert visibility type to boolean
 * Remove data from hidden cards
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

  let cardVisibilities = {
    info: true,
    talentManagement: true,
    officialLanguage: true,
    skills: true,
    competencies: true,
    developmentalGoals: true,
    qualifiedPools: true,
    description: true,
    education: true,
    experience: true,
    careerInterests: true,
    mentorshipSkills: true,
    exFeeder: true,
    employmentEquityGroup: true,
  };

  /**
   * Check visibility of card based on user accessing it
   * @param {String} key - id of the card.
   */
  const isCardHidden = (key) =>
    (result.visibleCards[key] === "PRIVATE" ||
      (result.visibleCards[key] === "CONNECTIONS" && !isConnection)) &&
    !viewPrivateProfile(request);

  if (isCardHidden("info")) {
    result.employmentInfo = null;
    result.securityClearance = null;
    result.groupLevel = null;
    result.tenure = null;
    result.actingLevel = null;
    result.actingStartDate = null;
    result.actingEndDate = null;

    cardVisibilities.info = false;
  }

  if (isCardHidden("talentManagement")) {
    result.careerMobility = null;
    result.talentMatrixResult = null;

    cardVisibilities.talentManagement = false;
  }

  if (isCardHidden("description")) {
    result.description = null;

    cardVisibilities.description = false;
  }

  if (isCardHidden("officialLanguage")) {
    result.firstLanguage = null;
    result.secondLanguage = null;
    result.secondLangProfs = null;

    cardVisibilities.officialLanguage = false;
  } else if (result.secondLangProfs) {
    result.secondLangProfs.forEach((lang, index) => {
      delete result.secondLangProfs[index].date;
    });
  }

  if (isCardHidden("skills")) {
    result.skills = [];

    cardVisibilities.skills = false;
  }
  if (isCardHidden("competencies")) {
    result.competencies = [];

    cardVisibilities.competencies = false;
  }

  if (isCardHidden("mentorshipSkills")) {
    result.mentorshipSkills = [];

    cardVisibilities.mentorshipSkills = false;
  }

  if (isCardHidden("developmentalGoals")) {
    result.developmentalGoals = [];
    result.developmentalGoalsAttachments = [];

    cardVisibilities.developmentalGoals = false;
  }

  if (isCardHidden("qualifiedPools")) {
    result.qualifiedPools = [];

    cardVisibilities.qualifiedPools = false;
  }

  if (isCardHidden("education")) {
    result.educations = [];

    cardVisibilities.education = false;
  }

  if (isCardHidden("experience")) {
    result.experiences = [];

    cardVisibilities.experience = false;
  }

  if (isCardHidden("employmentEquityGroup")) {
    result.employmentEquityGroups = [];

    cardVisibilities.employmentEquityGroup = false;
  }

  if (isCardHidden("careerInterests")) {
    result.interestedInRemote = null;
    result.lookingJob = null;
    result.relocationLocations = null;

    cardVisibilities.careerInterests = false;
  }

  if (isCardHidden("exFeeder")) {
    result.exFeeder = null;

    cardVisibilities.exFeeder = false;
  }

  result.visibleCards = cardVisibilities;

  return result;
}

module.exports = filterProfileVisibility;
