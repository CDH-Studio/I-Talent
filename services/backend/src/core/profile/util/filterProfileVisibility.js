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

  const tempCards = {
    info: true,
    talentManagement: true,
    officialLanguage: true,
    skills: true,
    competencies: true,
    developmentalGoals: true,
    description: true,
    education: true,
    experience: true,
    projects: true,
    careerInterests: true,
    mentorshipSkills: true,
    exFeeder: true,
  };

  const hideCard = (key) =>
    (result.visibleCards[key] === "PRIVATE" ||
      (result.visibleCards[key] === "CONNECTIONS" && !isConnection)) &&
    !viewPrivateProfile(request);

  if (hideCard("info")) {
    result.employmentInfo = null;
    result.securityClearance = null;
    result.groupLevel = null;
    result.tenure = null;
    result.actingLevel = null;
    result.actingStartDate = null;
    result.actingEndDate = null;

    tempCards.info = false;
  }

  if (hideCard("talentManagement")) {
    result.careerMobility = null;
    result.talentMatrixResult = null;

    tempCards.talentManagement = false;
  }

  if (hideCard("description")) {
    result.description = null;

    tempCards.description = false;
  }

  if (hideCard("officialLanguage")) {
    result.firstLanguage = null;
    result.secondLanguage = null;
    result.secondLangProfs = null;
    tempCards.officialLanguage = false;
  } else if (result.secondLangProfs) {
    result.secondLangProfs.forEach((lang, index) => {
      delete result.secondLangProfs[index].date;
    });
  }

  if (hideCard("skills")) {
    result.skills = [];

    tempCards.skills = false;
  }
  if (hideCard("competencies")) {
    result.competencies = [];

    tempCards.competencies = false;
  }

  if (hideCard("mentorshipSkills")) {
    result.mentorshipSkills = [];

    tempCards.mentorshipSkills = false;
  }

  if (hideCard("developmentalGoals")) {
    result.developmentalGoals = [];

    tempCards.developmentalGoals = false;
  }

  if (hideCard("education")) {
    result.educations = [];

    tempCards.education = false;
  }

  if (hideCard("experience")) {
    result.experiences = [];

    tempCards.experience = false;
  }

  if (hideCard("projects")) {
    result.projects = [];

    tempCards.projects = false;
  }

  if (hideCard("employmentEquityGroup")) {
    result.employmentEquityGroups = [];

    tempCards.employmentEquityGroup = false;
  }

  if (hideCard("careerInterests")) {
    result.interestedInRemote = null;
    result.lookingJob = null;
    result.relocationLocations = null;

    tempCards.careerInterests = false;
  }

  if (hideCard("exFeeder")) {
    result.exFeeder = null;
    tempCards.exFeeder = false;
  }

  result.visibleCards = tempCards;

  return result;
}

module.exports = filterProfileVisibility;
