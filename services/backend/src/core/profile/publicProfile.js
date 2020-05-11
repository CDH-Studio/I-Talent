const moment = require("moment");

const { profile } = require("../../database/models");

// Get the Profile's education history and format the result
const getEducationHelper = async (getProfile) => {
  const education = await profile.getEducation({
    order: [["startDate", "DESC"]],
  });
  return Promise.all(
    education.map(async (educ) => {
      const startDate = moment(educ.startDate);
      const endDate = moment(educ.endDate);
      const school = await educ.getSchool().then((res) => {
        if (res) return res.dataValues;
      });
      const diploma = await educ.getDiploma().then((res) => {
        if (res) return res.dataValues;
      });
      educ = educ.dataValues;

      return {
        school: {
          id: school.id,
          description: { en: school.description, fr: school.description },
        },
        diploma: {
          id: diploma.id,
          description: {
            en: diploma.descriptionEn,
            fr: diploma.descriptionFr,
          },
        },
        content: "",
        startDate: { en: startDate, fr: startDate },
        endDate: { en: endDate, fr: endDate },
      };
    })
  );
};

// Get the Profile's experience history and format the result
const getExperiencesHelper = async (getProfile) => {
  const experiences = await profile.getExperiences({
    order: [["startDate", "DESC"]],
  });
  return experiences.map((experience) => {
    const startDate = moment(experience.startDate);
    const endDate = moment(experience.endDate);

    return {
      subheader: experience.organization,
      header: experience.jobTitle,
      content: experience.description,
      startDate: startDate,
      endDate: endDate,
    };
  });
};

// FIXME: Refactor profile
const getPublicProfileById = async (request, response) => {
  const { id } = request.params;

  // get user profile
  const getProfile = await profile.findOne({ where: { id: id } });
  if (!getProfile) {
    return response.status(404).json({
      status: "API Query Error",
      message: "User profile with the provided ID not found",
    });
  }

  // get user info based on profile
  const user = await profile.getUser();
  if (!user) {
    return response.status(404).json({
      status: "API Query Error",
      message: "User with the provided ID not found",
    });
  }

  // merge info from profile and user
  const data = { ...getProfile.dataValues, ...getProfile.dataValues };

  // Get User Tenure (may be empty)
  const tenure = await profile.getTenure({ raw: true });

  // Get Career Mobility (may be empty)
  const careerMobility = await profile.getCareerMobility({ raw: true });

  // Get Talent Matrix (may be empty)
  const talentMatrixResult = await profile.getTalentMatrixResult({ raw: true });

  // Get Group Level (may be empty)
  const groupLevel = await profile.getGroupLevel({ raw: true });

  // Get Security Clearance (may be empty)
  const securityClearance = await profile.getSecurityClearance({ raw: true });

  // Get Acting Position (may be empty)
  const acting = await profile.getActing({ raw: true });

  // Get Location (may be empty)
  const location = await profile.getLocation({ raw: true });

  // Get Experience (may be empty)
  const careerSummary = await getExperiencesHelper(profile);

  // Get Projects (may be empty)
  const dbProjects = await profile.getProfileProjects();
  const projects = dbProjects.map((project) => {
    return { text: project.description };
  });

  // Get Education (may be empty)
  const educArray = await getEducationHelper(profile);

  const organizationList = await profile
    .getProfileOrganizations({ order: [["tier", "ASC"]] })
    .then((organizations) => {
      const orgList = organizations.map((organization) => {
        return {
          en: organization.descriptionEn,
          fr: organization.descriptionFr,
        };
      });
      return orgList;
    });

  const skills = await profile.getSkills().map(async (skill) => {
    if (skill) {
      const cats = await skill.getCategory({
        attributes: ["descriptionEn", "descriptionFr", "id"],
        require: true,
      });
      return {
        id: skill.dataValues.id,
        description: {
          en: skill.dataValues.descriptionEn,
          fr: skill.dataValues.descriptionFr,
          category: {
            en: cats.dataValues.descriptionEn,
            fr: cats.dataValues.descriptionFr,
          },
          categoryId: skill.dataValues.categoryId,
        },
      };
    }
  });

  const mentorshipSkills = await profile
    .getMentorshipSkills()
    .map(async (mentorshipSkill) => {
      if (mentorshipSkill) {
        const cats = await mentorshipSkill.getCategory({
          attributes: ["descriptionEn", "descriptionFr", "id"],
          require: true,
        });
        return {
          id: mentorshipSkill.dataValues.id,
          description: {
            en: mentorshipSkill.dataValues.descriptionEn,
            fr: mentorshipSkill.dataValues.descriptionFr,
            category: {
              en: cats.dataValues.descriptionEn,
              fr: cats.dataValues.descriptionFr,
            },
            categoryId: mentorshipSkill.dataValues.categoryId,
          },
        };
      }
    });

  const competencies = await profile.getCompetencies().map((competency) => {
    if (competency)
      return {
        id: competency.dataValues.id,
        description: {
          en: competency.dataValues.descriptionEn,
          fr: competency.dataValues.descriptionFr,
        },
      };
  });

  const developmentalGoals = await profile.getDevelopmentGoals().map((goal) => {
    if (goal)
      return {
        id: goal.dataValues.id,
        description: {
          en: goal.dataValues.descriptionEn,
          fr: goal.dataValues.descriptionFr,
        },
      };
  });

  const secLangProf = await profile
    .getSecondLanguageProficiency()
    .then((res) => {
      if (res) return res.dataValues;
    });

  const relocationLocations = await profile
    .getRelocationLocations()
    .then((relocs) =>
      Promise.all(
        relocs.map((element) =>
          element.getLocation().then((loc) => ({
            description: {
              en: `${loc.city}, ${loc.provinceEn}`,
              fr: `${loc.city}, ${loc.provinceFr}`,
            },
            id: element.id,
            locationId: loc.id,
          }))
        )
      )
    );

  const lookingForNewJob = await profile
    .getLookingForANewJob()
    .then((value) => {
      if (!value) {
        return null;
      }
      return {
        id: value.id,
        description: { en: value.descriptionEn, fr: value.descriptionFr },
      };
    });

  // Format location address to display (Number and street name, Province)
  const locationDescription = {
    en: location
      ? `${location.addressEn}, ${location.city}, ${location.provinceEn}`
      : null,
    fr: location
      ? `${location.addressFr}, ${location.city}, ${location.provinceFr}`
      : null,
  };

  // Response Object
  const { visibleCards } = data;

  // resData that will be sent by default to the Profile view
  let resData = {
    visibleCards,
    firstName: data.firstName,
    lastName: data.lastName,
    avatarColor: data.avatarColor,
    nameInitials: data.nameInitials,
    branch: { en: data.branchEn, fr: data.branchFr },
    organizationList,
    email: data.email,
    location: {
      id: location ? location.id : null,
      description: locationDescription,
    },
    manager: data.manager,
    telephone: data.telephone,
    cellphone: data.cellphone,
    jobTitle: { en: data.jobTitleEn, fr: data.jobTitleFr },
    flagged: data.flagged,
    linkedinUrl: data.linkedin,
    githubUrl: data.github,
    gcconnexUrl: data.gcconnex,
    team: data.team,
  };

  // send resData for EmploymentInfo card only if the card is visible
  if (visibleCards.info)
    resData = {
      ...resData,
      acting: {
        id: acting ? acting.id : null,
        description: acting ? acting.description : null,
      },
      actingPeriodStartDate: data.actingStartDate,
      actingPeriodEndDate: data.actingEndDate,
      classification: {
        id: groupLevel ? groupLevel.id : null,
        description: groupLevel ? groupLevel.description : null,
      },
      temporaryRole: {
        id: tenure ? tenure.id : null,
        description: {
          en: tenure ? tenure.descriptionEn : null,
          fr: tenure ? tenure.descriptionFr : null,
        },
      },
      security: {
        id: securityClearance ? securityClearance.id : null,
        description: {
          en: securityClearance ? securityClearance.descriptionEn : null,
          fr: securityClearance ? securityClearance.descriptionFr : null,
        },
      },
      indeterminate: data.indeterminate,
    };

  // send resData for TalentManagement card only if the card is visible
  if (visibleCards.talentManagement)
    resData = {
      ...resData,

      careerMobility: {
        id: careerMobility ? careerMobility.id : null,
        description: {
          en: careerMobility ? careerMobility.descriptionEn : null,
          fr: careerMobility ? careerMobility.descriptionFr : null,
        },
      },
      exFeeder: data.exFeeder,
      talentMatrixResult: {
        id: talentMatrixResult ? talentMatrixResult.id : null,
        description: {
          en: talentMatrixResult ? talentMatrixResult.descriptionEn : null,
          fr: talentMatrixResult ? talentMatrixResult.descriptionFr : null,
        },
      },
    };

  // send resData for officialLanguage card only if the card is visible
  if (visibleCards.officialLanguage)
    resData = {
      ...resData,
      gradedOnSecondLanguage: true,
      firstLanguage: {
        fr: { en: "French", fr: "Français" },
        en: { en: "English", fr: "Anglais" },
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
      secondLanguage: {
        fr: { en: "French", fr: "Français" },
        en: { en: "English", fr: "Anglais" },
      }[data.secondLanguage],
    };

  // send resData for skills card only if the card is visible
  if (visibleCards.skills)
    resData = {
      ...resData,
      skills,
    };

  // send resData for mentorshipSkills card only if the card is visible
  if (visibleCards.mentorshipSkills)
    resData = {
      ...resData,
      mentorshipSkills,
      isMentor: data.isMentor,
    };

  // send resData for competencies card only if the card is visible
  if (visibleCards.competencies)
    resData = {
      ...resData,
      competencies,
    };

  // send resData for developmentalGoals card only if the card is visible
  if (visibleCards.developmentalGoals)
    resData = {
      ...resData,
      developmentalGoals,
    };

  // send resData for education card only if the card is visible
  if (visibleCards.education)
    resData = {
      ...resData,
      education: educArray,
    };

  // send resData for experience card only if the card is visible
  if (visibleCards.experience)
    resData = {
      ...resData,
      careerSummary,
    };

  // send resData for projects card only if the card is visible
  if (visibleCards.projects)
    resData = {
      ...resData,
      projects,
    };

  // send resData for careerInterests card only if the card is visible
  if (visibleCards.careerInterests)
    resData = {
      ...resData,
      interestedInRemote: data.interestedInRemote,
      relocationLocations: relocationLocations,
      lookingForNewJob: lookingForNewJob,
    };

  response.status(200).json(resData);
};

module.exports = {
  getPublicProfileById,
};
