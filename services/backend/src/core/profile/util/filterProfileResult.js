const moment = require("moment");
const _ = require("lodash");

function updatedAtReducer(accumulator, { updatedAt }) {
  if (!accumulator || moment(updatedAt).isAfter(moment(accumulator), "day")) {
    // eslint-disable-next-line no-param-reassign
    accumulator = updatedAt;
  }

  return accumulator;
}

/**
 * Properly formats the profile information to be sent to the user
 *
 * @param {Object} profile Database user information
 * @param {"ENGLISH" | "FRENCH"} language Then language to filter the results
 */
function filterProfileResult(profile, language) {
  let filteredProfile = {
    ...profile,
    nameInitials: `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`,
  };

  if (profile.skills) {
    const skills = profile.skills.map(({ skill }) => {
      if (skill.translations && skill.category.translations)
        return {
          id: skill.id,
          name: skill.translations[0].name,
          categoryId: skill.category.id,
          category: skill.category.translations[0].name,
        };
      return null;
    });

    filteredProfile.skills = _.sortBy(_.remove(skills, null), "name");
    filteredProfile.skillsUpdatedAt = profile.skills.reduce(
      updatedAtReducer,
      undefined
    );
  }

  if (profile.mentorshipSkills) {
    const skills = profile.mentorshipSkills.map(({ skill }) => {
      if (skill.translations && skill.category.translations)
        return {
          id: skill.id,
          name: skill.translations[0].name,
          categoryId: skill.category.id,
          category: skill.category.translations[0].name,
        };
      return null;
    });

    filteredProfile.mentorshipSkills = _.sortBy(_.remove(skills, null), "name");
    filteredProfile.mentorshipSkillsUpdatedAt = profile.mentorshipSkills.reduce(
      updatedAtReducer,
      undefined
    );
  }

  if (profile.competencies) {
    const competencies = profile.competencies.map(({ competency }) => {
      if (competency.translations)
        return {
          id: competency.id,
          name: competency.translations[0].name,
        };
      return null;
    });

    filteredProfile.competencies = _.sortBy(
      _.remove(competencies, null),
      "name"
    );
    filteredProfile.competenciesUpdatedAt = profile.competencies.reduce(
      updatedAtReducer,
      undefined
    );
  }

  if (profile.developmentalGoals) {
    const developmentalGoals = profile.developmentalGoals.map((goal) => {
      const competency =
        goal.competency && goal.competency.translations
          ? {
              id: goal.competency.id,
              name: goal.competency.translations[0].name,
            }
          : null;

      const skill =
        goal.skill && goal.skill.translations
          ? {
              id: goal.skill.id,
              name: goal.skill.translations[0].name,
            }
          : null;
      return competency || skill;
    });

    filteredProfile.developmentalGoals = _.sortBy(
      _.remove(developmentalGoals, null),
      "name"
    );
    filteredProfile.developmentalGoalsUpdatedAt = profile.developmentalGoals.reduce(
      updatedAtReducer,
      undefined
    );
  }

  if (profile.educations) {
    const educations = profile.educations.map((education) => {
      const translatedDiploma =
        education.diploma.translations.find((i) => i.language === language) ||
        education.diploma.translations[0];

      const translatedSchool =
        education.school.translations.find((i) => i.language === language) ||
        education.school.translations[0];

      return {
        id: education.id,
        startDate: education.startDate,
        endDate: education.endDate,
        description: education.description,
        diploma: {
          id: education.diploma.id,
          description: translatedDiploma ? translatedDiploma.description : null,
        },
        school: {
          id: education.school.id,
          country: education.school.abbrCountry,
          province: education.school.abbrProvince,
          name: translatedSchool ? translatedSchool.name : null,
        },
      };
    });

    filteredProfile.educations = _.orderBy(educations, "startDate", "desc");

    filteredProfile.educationsUpdatedAt = profile.educations.reduce(
      updatedAtReducer,
      undefined
    );
  }

  if (profile.experiences) {
    const experiences = profile.experiences.map((experience) => {
      const translatedExperience =
        experience.translations.find((i) => i.language === language) ||
        experience.translations[0];

      return {
        id: experience.id,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: translatedExperience
          ? translatedExperience.description
          : null,
        jobTitle: translatedExperience ? translatedExperience.jobTitle : null,
        organization: translatedExperience
          ? translatedExperience.organization
          : null,
      };
    });

    filteredProfile.experiences = _.orderBy(experiences, "startDate", "desc");

    filteredProfile.experiencesUpdatedAt = profile.experiences.reduce(
      updatedAtReducer,
      undefined
    );
  }

  if (profile.securityClearance) {
    filteredProfile.securityClearance = {
      id: profile.securityClearance.id,
      description: profile.securityClearance.translations[0]
        ? profile.securityClearance.translations[0].description
        : null,
    };
  }

  if (profile.lookingJob) {
    filteredProfile.lookingJob = {
      id: profile.lookingJob.id,
      description: profile.lookingJob.translations[0]
        ? profile.lookingJob.translations[0].description
        : null,
    };
  }

  if (profile.tenure) {
    filteredProfile.tenure = {
      id: profile.tenure.id,
      description: profile.tenure.translations[0]
        ? profile.tenure.translations[0].name
        : null,
    };
  }

  if (profile.careerMobility) {
    filteredProfile.careerMobility = {
      id: profile.careerMobility.id,
      description: profile.careerMobility.translations[0]
        ? profile.careerMobility.translations[0].description
        : null,
    };
  }

  if (profile.employmentInfo) {
    const trans = profile.employmentInfo.translations[0];
    filteredProfile.jobTitle = trans ? trans.jobTitle : null;
    filteredProfile.branch = trans ? trans.branch : null;
  }

  if (profile.talentMatrixResult) {
    filteredProfile.talentMatrixResult = {
      id: profile.talentMatrixResult.id,
      description: profile.talentMatrixResult.translations[0]
        ? profile.talentMatrixResult.translations[0].description
        : null,
    };
  }

  if (profile.officeLocation) {
    filteredProfile.officeLocation = {
      id: profile.officeLocation.id,
      postalCode: profile.officeLocation.postalCode,
      streetNumber: profile.officeLocation.streetNumber,
      city: profile.officeLocation.city,
      country: profile.officeLocation.country,
      streetName: profile.officeLocation.translations[0]
        ? profile.officeLocation.translations[0].streetName
        : null,
      province: profile.officeLocation.translations[0]
        ? profile.officeLocation.translations[0].province
        : null,
    };
  }

  if (profile.relocationLocations) {
    filteredProfile.relocationLocations = filteredProfile.relocationLocations.map(
      ({ location }) => ({
        id: location.id,
        streetNumber: location.streetNumber,
        postalCode: location.postalCode,
        city: location.city,
        country: location.country,
        province: location.translations[0]
          ? location.translations[0].province
          : null,
        streetName: location.translations[0]
          ? location.translations[0].streetName
          : null,
      })
    );
  }

  if (profile.secondLangProfs) {
    filteredProfile.secondLangProfs = profile.secondLangProfs.map((prof) => {
      let expiredValue = prof.unknownExpiredDate;

      let dateValue = null;
      if (!prof.unknownExpiredDate && prof.date) {
        dateValue = moment(prof.date);
        if (dateValue.isBefore()) {
          expiredValue = true;
        } else {
          expiredValue = false;
        }
      }

      return {
        id: prof.id,
        date: dateValue,
        proficiency: prof.proficiency,
        expired: expiredValue,
        level: prof.level,
      };
    });
  }

  if (profile.organizations) {
    filteredProfile.organizations = profile.organizations.map((org) => {
      _.sortBy(org, "tier");
      return org.organizationTier.map((tier) => ({
        tier: tier.tier,
        id: tier.id,
        title: tier.translations[0].description,
      }));
    });
  }

  return filteredProfile;
}

module.exports = filterProfileResult;
