const moment = require("moment");
const Models = require("../../models");
const Profile = Models.profile;
const Skill = Models.skill;
const Category = Models.category;

const getProfile = async (request, response) => {
  response.status(200).json(await Profile.findAll());
};

// Get user profile using profile ID
const getPublicProfileById = async (request, response) => {
  const id = request.params.id;

  // get user profile
  let profile = await Profile.findOne({ where: { id: id } });
  if (!profile) {
    return response.status(404).json({
      status: "API Query Error",
      message: "User profile with the provided ID not found"
    });
  }

  // get user info based on profile
  let user = await profile.getUser({ raw: true });
  if (!profile) {
    return response.status(404).json({
      status: "API Query Error",
      message: "User with the provided ID not found"
    });
  }

  // merge info from profile and user
  let data = { ...profile.dataValues, ...user.dataValues };

  // // Get User Tenure
  // let tenure = await profile.getTenure();
  // if (!tenure) {
  //   return response.status(404).json({
  //     status: "API Query Error",
  //     message: "User tenure not found"
  //   });
  // }

  // // Get Career Mobility
  // let careerMobility = await profile.getCareerMobility();
  // if (!careerMobility) {
  //   return response.status(404).json({
  //     status: "API Query Error",
  //     message: "User career mobility not found"
  //   });
  // }

  let tenure = await profile.getTenure().then(res => {
    if (res) return res.dataValues;
  });

  let careerMobility = await profile.getCareerMobility().then(res => {
    if (res) return res.dataValues;
  });

  let talentMatrixResult = await profile.getTalentMatrixResult().then(res => {
    if (res) return res.dataValues;
  });

  let groupLevel = await profile.getGroupLevel().then(res => {
    if (res) return res.dataValues;
  });

  let securityClearance = await profile.getSecurityClearance().then(res => {
    if (res) return res.dataValues;
  });

  let acting = await profile.getActing().then(res => {
    if (res) return res.dataValues;
  });

  let location = await profile.getLocation().then(res => {
    if (res) return res.dataValues;
  });

  let experiences = await profile.getExperiences({
    order: [["startDate", "DESC"]]
  });
  let careerSummary = experiences.map(experience => {
    let startDate = moment(experience.startDate);
    let endDate = moment(experience.endDate);

    return {
      subheader: experience.organization,
      header: experience.jobTitle,
      content: experience.description,
      startDate: startDate,
      endDate: endDate
    };
  });

  let dbProjects = await profile.getProfileProjects();
  let projects = dbProjects.map(project => {
    return { text: project.description };
  });

  let education = await profile.getEducation({
    order: [["startDate", "DESC"]]
  });
  let educations = () => {
    return Promise.all(
      education.map(async educ => {
        let startDate = moment(educ.startDate);
        let endDate = moment(educ.endDate);
        let school = await educ.getSchool().then(res => {
          if (res) return res.dataValues;
        });
        let diploma = await educ.getDiploma().then(res => {
          if (res) return res.dataValues;
        });
        educ = educ.dataValues;

        return {
          school: {
            id: school.id,
            description: { en: school.description, fr: school.description }
          },
          diploma: {
            id: diploma.id,
            description: {
              en: diploma.descriptionEn,
              fr: diploma.descriptionFr
            }
          },
          content: "",
          startDate: { en: startDate, fr: startDate },
          endDate: { en: endDate, fr: endDate }
        };
      })
    );
  };

  let educArray = await educations();

  let organizationList = await profile
    .getProfileOrganizations({ order: [["tier", "ASC"]] })
    .then(organizations => {
      let orgList = organizations.map(organization => {
        return {
          en: organization.descriptionEn,
          fr: organization.descriptionFr
        };
      });
      return orgList;
    });

  let skills = await profile.getSkills().map(async skill => {
    if (skill) {
      let cats = await skill.getCategory({
        attributes: ["descriptionEn", "descriptionFr", "id"],
        require: true
      });
      return {
        id: skill.dataValues.id,
        description: {
          en:
            cats.dataValues.descriptionEn +
            ": " +
            skill.dataValues.descriptionEn,
          fr:
            cats.dataValues.descriptionFr +
            ": " +
            skill.dataValues.descriptionFr,
          category: {
            categoryEn: cats.dataValues.descriptionEn,
            categoryFr: cats.dataValues.descriptionFr
          },
          categoryId: skill.dataValues.categoryId
        }
      };
    }
  });

  let competencies = await profile.getCompetencies().map(competency => {
    if (competency)
      return {
        id: competency.dataValues.id,
        description: {
          en: competency.dataValues.descriptionEn,
          fr: competency.dataValues.descriptionFr
        }
      };
  });

  let developmentalGoals = await profile.getDevelopmentGoals().map(goal => {
    if (goal)
      return {
        id: goal.dataValues.id,
        description: {
          en: goal.dataValues.descriptionEn,
          fr: goal.dataValues.descriptionFr
        }
      };
  });

  let mentorshipSkills = await profile
    .getMentorshipSkills()
    .map(async mentorshipSkill => {
      if (mentorshipSkill) {
        let cats = await mentorshipSkill.getCategory({
          attributes: ["descriptionEn", "descriptionFr", "id"],
          require: true
        });
        return {
          id: mentorshipSkill.dataValues.id,
          description: {
            en:
              cats.dataValues.descriptionEn +
              ": " +
              mentorshipSkill.dataValues.descriptionEn,
            fr:
              cats.dataValues.descriptionFr +
              ": " +
              mentorshipSkill.dataValues.descriptionFr,
            category: {
              categoryEn: cats.dataValues.descriptionEn,
              categoryFr: cats.dataValues.descriptionFr
            },
            categoryId: mentorshipSkill.dataValues.categoryId
          }
        };
      }
    });

  let secLangProf = await profile.getSecondLanguageProficiency().then(res => {
    if (res) return res.dataValues;
  });

  let relocationLocations = await profile
    .getRelocationLocations()
    .then(relocs =>
      Promise.all(
        relocs.map(element =>
          element.getLocation().then(loc => ({
            description: {
              en: loc.city + ", " + loc.provinceEn,
              fr: loc.city + ", " + loc.provinceFr
            },
            id: element.id,
            locationId: loc.id
          }))
        )
      )
    );

  let lookingForNewJob = await profile.getLookingForANewJob().then(value => {
    if (!value) {
      return null;
    }
    return {
      id: value.id,
      description: { en: value.descriptionEn, fr: value.descriptionFr }
    };
  });

  //Response Object
  const visibleCards = data.visibleCards;

  let resData = {
    visibleCards,
    firstName: data.firstName,
    lastName: data.lastName,
    branch: { en: data.branchEn, fr: data.branchFr },
    organizationList,
    email: data.email,
    location: {
      id: location ? location.id : null,
      description: {
        en: location
          ? location.addressEn +
            ", " +
            location.city +
            ", " +
            location.provinceEn
          : null,
        fr: location
          ? location.addressFr +
            ", " +
            location.city +
            ", " +
            location.provinceFr
          : null
      }
    },
    telephone: data.telephone,
    cellphone: data.cellphone,
    jobTitle: { en: data.jobTitleEn, fr: data.jobTitleFr },
    flagged: data.flagged,
    linkedinUrl: data.linkedin,
    githubUrl: data.github,
    twitterUrl: data.twitter,
    team: data.team
  };

  if (visibleCards.info)
    resData = {
      ...resData,
      acting: {
        id: acting ? acting.id : null,
        description: acting ? acting.description : null
      },
      actingPeriodStartDate: data.actingStartDate,
      actingPeriodEndDate: data.actingEndDate,
      classification: {
        id: groupLevel ? groupLevel.id : null,
        description: groupLevel ? groupLevel.description : null
      },
      temporaryRole: {
        id: tenure ? tenure.id : null,
        description: {
          en: tenure ? tenure.descriptionEn : null,
          fr: tenure ? tenure.descriptionFr : null
        }
      },
      security: {
        id: securityClearance ? securityClearance.id : null,
        description: {
          en: securityClearance ? securityClearance.descriptionEn : null,
          fr: securityClearance ? securityClearance.descriptionFr : null
        }
      },
      indeterminate: data.indeterminate
    };

  if (visibleCards.manager)
    resData = {
      ...resData,
      manager: data.manager
    };

  if (visibleCards.talentManagement)
    resData = {
      ...resData,

      careerMobility: {
        id: careerMobility ? careerMobility.id : null,
        description: {
          en: careerMobility ? careerMobility.descriptionEn : null,
          fr: careerMobility ? careerMobility.descriptionFr : null
        }
      },
      exFeeder: data.exFeeder,
      talentMatrixResult: {
        id: talentMatrixResult ? talentMatrixResult.id : null,
        description: {
          en: talentMatrixResult ? talentMatrixResult.descriptionEn : null,
          fr: talentMatrixResult ? talentMatrixResult.descriptionFr : null
        }
      }
    };

  if (visibleCards.officialLanguage)
    resData = {
      ...resData,
      gradedOnSecondLanguage: true,
      firstLanguage: {
        fr: { en: "French", fr: "Français" },
        en: { en: "English", fr: "Anglais" }
      }[data.firstLanguage],
      secondaryOralDate: secLangProf ? secLangProf.oralDate : null,
      secondaryOralProficiency: secLangProf
        ? secLangProf.oralProficiency
        : null,
      secondaryReadingDate: secLangProf ? secLangProf.readingDate : null,
      secondaryReadingProficiency: secLangProf
        ? secLangProf.readingProficiency
        : null,
      secondaryWritingDate: secLangProf ? secLangProf.writingDate : null,
      secondaryWritingProficiency: secLangProf
        ? secLangProf.writingProficiency
        : null,
      secondLanguage: null
    };

  if (visibleCards.skills)
    resData = {
      ...resData,
      skills
    };

  if (visibleCards.competencies)
    resData = {
      ...resData,
      competencies
    };

  if (visibleCards.developmentalGoals)
    resData = {
      ...resData,
      developmentalGoals
    };

  if (visibleCards.mentorshipSkills)
    resData = {
      ...resData,
      mentorshipSkills,
      isMentor: data.isMentor
    };

  if (visibleCards.education)
    resData = {
      ...resData,
      education: educArray
    };

  if (visibleCards.experience)
    resData = {
      ...resData,
      careerSummary
    };

  if (visibleCards.projects)
    resData = {
      ...resData,
      projects
    };

  if (visibleCards.careerInterests)
    resData = {
      ...resData,
      interestedInRemote: data.interestedInRemote,
      relocationLocations: relocationLocations,
      lookingForNewJob: lookingForNewJob
    };

  response.status(200).json(resData);
};

const getPrivateProfileById = async (request, response) => {
  const id = request.params.id;
  let profile = await Profile.findOne({ where: { id: id } });
  let user = await profile.getUser();

  if (!profile) response.status(404).send("Profile Not Found");
  let data = { ...profile.dataValues, ...user.dataValues };

  let tenure = await profile.getTenure().then(res => {
    if (res) return res.dataValues;
  });

  let careerMobility = await profile.getCareerMobility().then(res => {
    if (res) return res.dataValues;
  });

  let talentMatrixResult = await profile.getTalentMatrixResult().then(res => {
    if (res) return res.dataValues;
  });

  let groupLevel = await profile.getGroupLevel().then(res => {
    if (res) return res.dataValues;
  });

  let securityClearance = await profile.getSecurityClearance().then(res => {
    if (res) return res.dataValues;
  });

  let acting = await profile.getActing().then(res => {
    if (res) return res.dataValues;
  });

  let location = await profile.getLocation().then(res => {
    if (res) return res.dataValues;
  });

  let experiences = await profile.getExperiences({
    order: [["startDate", "DESC"]]
  });
  let careerSummary = experiences.map(experience => {
    let startDate = moment(experience.startDate);
    let endDate = moment(experience.endDate);

    return {
      subheader: experience.organization,
      header: experience.jobTitle,
      content: experience.description,
      startDate: startDate,
      endDate: endDate
    };
  });

  let dbProjects = await profile.getProfileProjects();
  let projects = dbProjects.map(project => {
    return { text: project.description };
  });

  let education = await profile.getEducation({
    order: [["startDate", "DESC"]]
  });
  let educations = () => {
    return Promise.all(
      education.map(async educ => {
        let startDate = moment(educ.startDate);
        let endDate = moment(educ.endDate);
        let school = await educ.getSchool().then(res => {
          if (res) return res.dataValues;
        });
        let diploma = await educ.getDiploma().then(res => {
          if (res) return res.dataValues;
        });
        educ = educ.dataValues;

        return {
          school: {
            id: school.id,
            description: { en: school.description, fr: school.description }
          },
          diploma: {
            id: diploma.id,
            description: {
              en: diploma.descriptionEn,
              fr: diploma.descriptionFr
            }
          },
          content: "",
          startDate: { en: startDate, fr: startDate },
          endDate: { en: endDate, fr: endDate }
        };
      })
    );
  };

  let educArray = await educations();

  let organizationList = await profile
    .getProfileOrganizations({ order: [["tier", "ASC"]] })
    .then(organizations => {
      let orgList = organizations.map(organization => {
        return {
          en: organization.descriptionEn,
          fr: organization.descriptionFr
        };
      });
      return orgList;
    });

  let skills = await profile.getSkills().map(async skill => {
    if (skill) {
      let cats = await skill.getCategory({
        attributes: ["descriptionEn", "descriptionFr", "id"],
        require: true
      });
      return {
        id: skill.dataValues.id,
        description: {
          en:
            cats.dataValues.descriptionEn +
            ": " +
            skill.dataValues.descriptionEn,
          fr:
            cats.dataValues.descriptionFr +
            ": " +
            skill.dataValues.descriptionFr,
          category: {
            categoryEn: cats.dataValues.descriptionEn,
            categoryFr: cats.dataValues.descriptionFr
          },
          categoryId: skill.dataValues.categoryId
        }
      };
    }
  });

  let competencies = await profile.getCompetencies().map(competency => {
    if (competency)
      return {
        id: competency.dataValues.id,
        description: {
          en: competency.dataValues.descriptionEn,
          fr: competency.dataValues.descriptionFr
        }
      };
  });

  let developmentalGoals = await profile.getDevelopmentGoals().map(goal => {
    if (goal)
      return {
        id: goal.dataValues.id,
        description: {
          en: goal.dataValues.descriptionEn,
          fr: goal.dataValues.descriptionFr
        }
      };
  });

  let mentorshipSkills = await profile
    .getMentorshipSkills()
    .map(async mentorshipSkill => {
      if (mentorshipSkill) {
        let cats = await mentorshipSkill.getCategory({
          attributes: ["descriptionEn", "descriptionFr", "id"],
          require: true
        });

        return {
          id: mentorshipSkill.dataValues.id,
          description: {
            en:
              cats.dataValues.descriptionEn +
              ": " +
              mentorshipSkill.dataValues.descriptionEn,
            fr:
              cats.dataValues.descriptionFr +
              ": " +
              mentorshipSkill.dataValues.descriptionFr,
            category: {
              categoryEn: cats.dataValues.descriptionEn,
              categoryFr: cats.dataValues.descriptionFr
            },
            categoryId: mentorshipSkill.dataValues.categoryId
          }
        };
      }
    });

  let secLangProf = await profile.getSecondLanguageProficiency().then(res => {
    if (res) return res.dataValues;
  });

  let relocationLocations = await profile
    .getRelocationLocations()
    .then(relocs =>
      Promise.all(
        relocs.map(element =>
          element.getLocation().then(loc => ({
            description: {
              en: loc.city + ", " + loc.provinceEn,
              fr: loc.city + ", " + loc.provinceFr
            },
            id: element.id,
            locationId: loc.id
          }))
        )
      )
    );

  let lookingForNewJob = await profile.getLookingForANewJob().then(value => {
    if (!value) {
      return null;
    }
    return {
      id: value.id,
      description: { en: value.descriptionEn, fr: value.descriptionFr }
    };
  });

  //Response Object
  let resData = {
    visibleCards: data.visibleCards,
    acting: {
      id: acting ? acting.id : null,
      description: acting ? acting.description : null
    },
    actingPeriodStartDate: data.actingStartDate,
    actingPeriodEndDate: data.actingEndDate,
    branch: { en: data.branchEn, fr: data.branchFr },
    careerMobility: {
      id: careerMobility ? careerMobility.id : null,
      description: {
        en: careerMobility ? careerMobility.descriptionEn : null,
        fr: careerMobility ? careerMobility.descriptionFr : null
      }
    },
    careerSummary,
    competencies,
    developmentalGoals,
    education: educArray,
    email: data.email,
    exFeeder: data.exFeeder,
    isMentor: data.isMentor,
    flagged: data.flagged,
    firstLanguage: {
      fr: { en: "French", fr: "Français" },
      en: { en: "English", fr: "Anglais" }
    }[data.firstLanguage],
    firstName: data.firstName,
    githubUrl: data.github,
    gradedOnSecondLanguage: true,
    classification: {
      id: groupLevel ? groupLevel.id : null,
      description: groupLevel ? groupLevel.description : null
    },
    jobTitle: { en: data.jobTitleEn, fr: data.jobTitleFr },
    lastName: data.lastName,
    linkedinUrl: data.linkedin,
    location: {
      id: location ? location.id : null,
      description: {
        en: location
          ? location.addressEn +
            ", " +
            location.city +
            ", " +
            location.provinceEn
          : null,
        fr: location
          ? location.addressFr +
            ", " +
            location.city +
            ", " +
            location.provinceFr
          : null
      }
    },
    manager: data.manager,
    cellphone: data.cellphone,
    organizationList,
    secondaryOralDate: secLangProf ? secLangProf.oralDate : null,
    secondaryOralProficiency: secLangProf ? secLangProf.oralProficiency : null,
    secondaryReadingDate: secLangProf ? secLangProf.readingDate : null,
    secondaryReadingProficiency: secLangProf
      ? secLangProf.readingProficiency
      : null,
    secondaryWritingDate: secLangProf ? secLangProf.writingDate : null,
    secondaryWritingProficiency: secLangProf
      ? secLangProf.writingProficiency
      : null,
    secondLanguage: null,
    security: {
      id: securityClearance ? securityClearance.id : null,
      description: {
        en: securityClearance ? securityClearance.descriptionEn : null,
        fr: securityClearance ? securityClearance.descriptionFr : null
      }
    },
    // categories,
    skills,
    mentorshipSkills,
    temporaryRole: {
      id: tenure ? tenure.id : null,
      description: {
        en: tenure ? tenure.descriptionEn : null,
        fr: tenure ? tenure.descriptionFr : null
      }
    },
    talentMatrixResult: {
      id: talentMatrixResult ? talentMatrixResult.id : null,
      description: {
        en: talentMatrixResult ? talentMatrixResult.descriptionEn : null,
        fr: talentMatrixResult ? talentMatrixResult.descriptionFr : null
      }
    },
    team: data.team,
    telephone: data.telephone,
    twitterUrl: data.twitter,
    projects: projects,
    interestedInRemote: data.interestedInRemote,
    relocationLocations: relocationLocations,
    lookingForNewJob: lookingForNewJob,
    indeterminate: data.indeterminate
  };

  response.status(200).json(resData);
};

module.exports = {
  getProfile,
  getPublicProfileById,
  getPrivateProfileById
};
