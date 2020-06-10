/* eslint-disable no-restricted-syntax */
const moment = require("moment");

const Models = require("../../database/models");

const Profile = Models.profile;
const Education = Models.education;
const Experience = Models.experience;
const ProfileOrganization = Models.profileOrganization;
const Project = Models.profileProject;
const SecLang = Models.secondLanguageProficiency;
const RelocationLocation = Models.relocationLocation;
const Location = Models.location;

/* This objects stores the names of the db attributes 
in relation to the object keys sent from the frontend */
const mappedValues = require("./util/mappedValues.json");

// TODO: Refactor
async function createProfile(request, response) {
  const { id } = request.params;
  const { body } = request;
  const dbObject = {};

  // FIXME: fix this error
  for (const [key, value] of Object.entries(body)) {
    dbObject[mappedValues[key] ? mappedValues[key] : key] = value;
  }

  if (dbObject.jobTitle) {
    dbObject.jobTitleEn = dbObject.jobTitle.en;
    dbObject.jobTitleFr = dbObject.jobTitle.fr;
  }

  if (dbObject.locationId.id) dbObject.locationId = dbObject.locationId.id;

  try {
    const [profile] = await Profile.upsert(
      { id, ...dbObject },
      { returning: true }
    );

    if (dbObject.skills) profile.setSkills(dbObject.skills);
    if (dbObject.competencies) profile.setCompetencies(dbObject.competencies);
    if (dbObject.developmentGoals)
      profile.setDevelopmentGoals(dbObject.developmentGoals);
    if (dbObject.mentorshipSkills)
      profile.setMentorshipSkills(dbObject.mentorshipSkills);

    if (dbObject.education) {
      Education.destroy({ where: { profileId: profile.id } }).then(() => {
        dbObject.education.forEach(
          ({ school, diploma, startDate, endDate }) => {
            Education.create({
              schoolId: school.id ? school.id : school,
              diplomaId: diploma.id ? diploma.id : diploma,
              startDate,
              endDate,
            }).then((education) => {
              profile.addEducation(education);
            });
          }
        );
      });
    }

    if (dbObject.experience) {
      Experience.destroy({ where: { profileId: profile.id } }).then(() => {
        dbObject.experience.forEach((exp) => {
          let startDate = moment(exp.startDate);
          let endDate = moment(exp.endDate);
          let content;
          if (!startDate.isValid()) startDate = null;
          else startDate = startDate.format();
          if (!endDate.isValid()) endDate = null;
          else endDate = endDate.format();
          if (!exp.content) content = "";
          Experience.create({
            organization: exp.subheader,
            jobTitle: exp.header,
            description: content,
            startDate: startDate,
            endDate: endDate,
          }).then((experience) => {
            profile.addExperience(experience);
          });
        });
      });
    }

    if (dbObject.projects) {
      Project.destroy({ where: { profileId: profile.id } }).then(() => {
        dbObject.projects.forEach((project) => {
          Project.create({
            description: project,
          }).then((projectData) => {
            profile.addProfileProject(projectData);
          });
        });
      });
    }

    if (dbObject.organizations) {
      ProfileOrganization.destroy({ where: { profileId: profile.id } }).then(
        () => {
          dbObject.organizations.forEach(
            ({ description: { en, fr }, tier }) => {
              ProfileOrganization.create({
                descriptionEn: en,
                descriptionFr: fr,
                tier,
              }).then((organization) => {
                profile.addProfileOrganization(organization);
              });
            }
          );
        }
      );
    }

    if (
      dbObject.readingProficiency ||
      dbObject.writingProficiency ||
      dbObject.oralProficiency ||
      dbObject.readingDate ||
      dbObject.writingDate ||
      dbObject.oralDate
    ) {
      let secLangProf;
      secLangProf = await profile.getSecondLanguageProficiency();
      if (!secLangProf) {
        secLangProf = await SecLang.create();
      }

      const {
        writingProficiency,
        oralProficiency,
        writingDate,
        readingDate,
        oralDate,
        readingProficiency,
      } = dbObject;

      secLangProf
        .update(
          {
            writingProficiency,
            oralProficiency,
            writingDate,
            readingDate,
            oralDate,
            readingProficiency,
          },
          { returning: true }
        )
        .then((secLangProfValue) => {
          profile.setSecondLanguageProficiency(secLangProfValue);
        });
    }
    if (!dbObject.gradedOnSecondLanguage) {
      SecLang.destroy({
        where: { id: profile.dataValues.secondLanguageProficiencyId },
      });
    }
    response.status(200).send("OK");
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
}

// TODO: Refactor
async function updateProfile(request, response) {
  const { id } = request.params;
  const { body } = request;
  const dbObject = {};

  for (const [key, value] of Object.entries(body)) {
    dbObject[mappedValues[key] ? mappedValues[key] : key] = value;
  }

  if (dbObject.jobTitle) {
    dbObject.jobTitleEn = dbObject.jobTitle.en;
    dbObject.jobTitleFr = dbObject.jobTitle.fr;
  }

  try {
    let [updated] = await Profile.update(dbObject, {
      where: { id: id },
    });

    const profile = await Profile.findOne({ where: { id: id } }).then((res) => {
      updated = true;
      return res;
    });

    if (dbObject.skills) profile.setSkills(dbObject.skills);
    if (dbObject.competencies) profile.setCompetencies(dbObject.competencies);
    if (dbObject.developmentGoals)
      profile.setDevelopmentGoals(dbObject.developmentGoals);
    if (dbObject.mentorshipSkills)
      profile.setMentorshipSkills(dbObject.mentorshipSkills);

    if (dbObject.education) {
      Education.destroy({ where: { profileId: profile.id } }).then(() => {
        dbObject.education.forEach(
          ({ school, diploma, startDate, endDate }) => {
            Education.create({
              schoolId: school.id ? school.id : school,
              diplomaId: diploma.id ? diploma.id : diploma,
              startDate,
              endDate,
            }).then((education) => {
              profile.addEducation(education);
            });
          }
        );
      });
    }

    if (dbObject.experience) {
      Experience.destroy({ where: { profileId: profile.id } }).then(() => {
        dbObject.experience.forEach((exp) => {
          let startDate = moment(exp.startDate);
          let endDate = moment(exp.endDate);
          let { content } = exp;
          if (!startDate.isValid()) startDate = null;
          else startDate = startDate.format();
          if (!exp.endDate || !endDate.isValid()) endDate = null;
          else endDate = endDate.format();
          if (!exp.content) content = "";
          Experience.create({
            organization: exp.subheader,
            jobTitle: exp.header,
            description: content,
            startDate: startDate,
            endDate: endDate,
          }).then((experience) => {
            profile.addExperience(experience);
          });
        });
      });
    }

    if (dbObject.projects) {
      Project.destroy({ where: { profileId: profile.id } }).then(() => {
        dbObject.projects.forEach((project) => {
          Project.create({
            description: project,
          }).then((projectData) => {
            profile.addProfileProject(projectData);
          });
        });
      });
    }

    if (dbObject.organizations) {
      ProfileOrganization.destroy({ where: { profileId: profile.id } }).then(
        () => {
          dbObject.organizations.forEach(
            ({ description: { en, fr }, tier }) => {
              ProfileOrganization.create({
                descriptionEn: en,
                descriptionFr: fr,
                tier,
              }).then((organization) => {
                profile.addProfileOrganization(organization);
              });
            }
          );
        }
      );
    }

    if (
      "readingProficiency" in dbObject ||
      "writingProficiency" in dbObject ||
      "oralProficiency" in dbObject ||
      "readingDate" in dbObject ||
      "writingDate" in dbObject ||
      "oralDate" in dbObject
    ) {
      let secLangProf;
      secLangProf = await profile.getSecondLanguageProficiency();
      if (!secLangProf) {
        secLangProf = await SecLang.create();
      }

      const {
        writingProficiency,
        oralProficiency,
        writingDate,
        readingDate,
        oralDate,
        readingProficiency,
      } = dbObject;

      secLangProf
        .update(
          {
            writingProficiency,
            oralProficiency,
            writingDate,
            readingDate,
            oralDate,
            readingProficiency,
          },
          { returning: true }
        )
        .then((selectLangProf) => {
          profile.setSecondLanguageProficiency(selectLangProf);
        });
    }
    if (dbObject.secondLanguage === null) {
      SecLang.destroy({
        where: { id: profile.dataValues.secondLanguageProficiencyId },
      });
    }

    if (dbObject.relocationLocations) {
      await RelocationLocation.destroy({
        where: { profileId: id },
      }).then(() =>
        dbObject.relocationLocations.forEach((element) => {
          RelocationLocation.create({}).then((relocationLocation) => {
            profile.addRelocationLocation(relocationLocation).then(() => {
              Location.findOne({ where: { id: element } }).then((location) => {
                location.addRelocationLocation(relocationLocation);
              });
            });
          });
        })
      );
    }

    // End of logic~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    if (updated) {
      return response.status(200).json(profile);
    }
    response.status(404).send("Profile not found");
    throw new Error("Profile not found");
  } catch (error) {
    console.error(error);
    return response.status(500).send(error.message);
  }
}
async function getProfile(response) {
  response.status(200).json(await Profile.findAll());
}

async function getProfileStatusById(request, response) {
  const { id } = request.params;
  const getProfileFromDB = await Profile.findOne({ where: { id: id } });
  return response.status(200).json({
    profile: { exists: !!getProfileFromDB },
  });
}

const getPrivateProfileById = async (request, response) => {
  const { id } = request.params;

  // get user profile
  const profile = await Profile.findOne({ where: { id: id } });
  if (!profile) {
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

  if (!profile) response.status(404).send("Profile Not Found");
  const data = { ...profile.dataValues, ...user.dataValues };

  const tenure = await profile.getTenure().then((res) => {
    if (res) return res.dataValues;
    return null;
  });

  const careerMobility = await profile.getCareerMobility().then((res) => {
    if (res) return res.dataValues;
    return null;
  });

  const talentMatrixResult = await profile
    .getTalentMatrixResult()
    .then((res) => {
      if (res) return res.dataValues;
      return null;
    });

  const groupLevel = await profile.getGroupLevel().then((res) => {
    if (res) return res.dataValues;
    return null;
  });

  const securityClearance = await profile.getSecurityClearance().then((res) => {
    if (res) return res.dataValues;
    return null;
  });

  const acting = await profile.getActing().then((res) => {
    if (res) return res.dataValues;
    return null;
  });

  const location = await profile.getLocation().then((res) => {
    if (res) return res.dataValues;
    return null;
  });

  const experiences = await profile.getExperiences({
    order: [["startDate", "DESC"]],
  });
  const careerSummary = experiences.map((experience) => {
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

  const dbProjects = await profile.getProfileProjects();
  const projects = dbProjects.map((project) => {
    return { text: project.description };
  });

  const education = await profile.getEducation({
    order: [["startDate", "DESC"]],
  });
  const educations = () => {
    return Promise.all(
      education.map(async (educ) => {
        const startDate = moment(educ.startDate);
        const endDate = moment(educ.endDate);
        const school = await educ.getSchool().then((res) => {
          if (res) return res.dataValues;
          return null;
        });
        const diploma = await educ.getDiploma().then((res) => {
          if (res) return res.dataValues;
          return null;
        });

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

  const educArray = await educations();

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
    return null;
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
    return null;
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
    return null;
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
      return null;
    });

  const secLangProf = await profile
    .getSecondLanguageProficiency()
    .then((res) => {
      if (res) return res.dataValues;
      return null;
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

  // Response Object
  const resData = {
    visibleCards: data.visibleCards,
    acting: {
      id: acting ? acting.id : null,
      description: acting ? acting.description : null,
    },
    actingPeriodStartDate: data.actingStartDate,
    actingPeriodEndDate: data.actingEndDate,
    branch: { en: data.branchEn, fr: data.branchFr },
    careerMobility: {
      id: careerMobility ? careerMobility.id : null,
      description: {
        en: careerMobility ? careerMobility.descriptionEn : null,
        fr: careerMobility ? careerMobility.descriptionFr : null,
      },
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
      en: { en: "English", fr: "Anglais" },
    }[data.firstLanguage],
    firstName: data.firstName,
    lastName: data.lastName,
    avatarColor: data.avatarColor,
    nameInitials: data.nameInitials,
    githubUrl: data.github,
    gradedOnSecondLanguage: true,
    classification: {
      id: groupLevel ? groupLevel.id : null,
      description: groupLevel ? groupLevel.description : null,
    },
    jobTitle: { en: data.jobTitleEn, fr: data.jobTitleFr },

    linkedinUrl: data.linkedin,
    location: {
      id: location ? location.id : null,
      description: {
        en: location
          ? `${location.addressEn}, ${location.city}, ${location.provinceEn}`
          : null,
        fr: location
          ? `${location.addressFr}, ${location.city}, ${location.provinceFr}`
          : null,
      },
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
        fr: securityClearance ? securityClearance.descriptionFr : null,
      },
    },
    // categories,
    skills,
    mentorshipSkills,
    temporaryRole: {
      id: tenure ? tenure.id : null,
      description: {
        en: tenure ? tenure.descriptionEn : null,
        fr: tenure ? tenure.descriptionFr : null,
      },
    },
    talentMatrixResult: {
      id: talentMatrixResult ? talentMatrixResult.id : null,
      description: {
        en: talentMatrixResult ? talentMatrixResult.descriptionEn : null,
        fr: talentMatrixResult ? talentMatrixResult.descriptionFr : null,
      },
    },
    team: data.team,
    telephone: data.telephone,
    gcconnexUrl: data.gcconnex,
    projects: projects,
    interestedInRemote: data.interestedInRemote,
    relocationLocations: relocationLocations,
    lookingForNewJob: lookingForNewJob,
    indeterminate: data.indeterminate,
  };
  return response.status(200).json(resData);
};

// Get user profile using profile ID
// eslint-disable-next-line consistent-return
const getPublicProfileById = async (request, response) => {
  const { id } = request.params;

  // get user profile
  const profile = await Profile.findOne({ where: { id: id } });
  if (!profile) {
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
  const data = { ...profile.dataValues, ...user.dataValues };

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
  // const careerSummary = await profile.getExperiencesHelper(profile);
  const careerSummary = [];

  // Get Projects (may be empty)
  const dbProjects = await profile.getProfileProjects();
  const projects = dbProjects.map((project) => {
    return { text: project.description };
  });

  // Get Education (may be empty)
  // const educArray = await profile.getEducationHelper(profile);
  const educArray = [];

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
    return null;
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
      return null;
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
    return null;
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
    return null;
  });

  const secLangProf = await profile
    .getSecondLanguageProficiency()
    .then((res) => {
      if (res) return res.dataValues;
      return null;
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
      talentMatrixResult: {
        id: talentMatrixResult ? talentMatrixResult.id : null,
        description: {
          en: talentMatrixResult ? talentMatrixResult.descriptionEn : null,
          fr: talentMatrixResult ? talentMatrixResult.descriptionFr : null,
        },
      },
    };

  // send exFeeder for TalentManagement card only if the card is visible
  if (visibleCards.exFeeder)
    resData = {
      ...resData,
      exFeeder: data.exFeeder,
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
  getProfile,
  getPublicProfileById,
  getPrivateProfileById,
  getProfileStatusById,
  createProfile,
  updateProfile,
};
