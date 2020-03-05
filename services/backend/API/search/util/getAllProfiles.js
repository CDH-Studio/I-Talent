const moment = require("moment");
const Fuse = require("fuse.js");

const Models = require("../../../models");
const Profile = Models.profile;
const User = Models.user;

const NUMBER_OF_SKILL_RESULT = 4;

const getAllProfiles = async searchValue => {
  const profiles = await Profile.findAll({
    attributes: [
      "id",
      "branchEn",
      "firstName",
      "lastName",
      "jobTitleEn",
      "jobTitleFr",
      "telephone",
      "cellphone",
      "manager",
      "team",
      "groupLevelId",
      "locationId",
      "actingId",
      "exFeeder",
      "flagged",
      "visibleCards"
    ],
    include: [
      { model: User, attributes: ["inactive"], where: { inactive: false } }
    ],
    where: {
      flagged: false
    }
  });
  const allProf = await _getProfs(profiles, searchValue).then(profs => profs);

  return allProf;
};

_getProfs = (profiles, searchValue) => {
  return Promise.all(
    profiles.map(profile => {
      return _getProf(profile, searchValue);
    })
  );
};

_getProf = async (profile, searchValue) => {
  let user = await profile.getUser({ attributes: ["email"] });

  if (!profile) response.status(404).send("Profile Not Found");

  let profileData = profile ? profile.dataValues : {};
  let userData = user ? user.dataValues : {};

  let data = { ...profileData, ...userData };

  let groupLevel = await profile.getGroupLevel().then(res => {
    if (res) return res.dataValues;
  });

  let acting = await profile.getActing().then(res => {
    if (res) return res.dataValues;
  });

  let location = await profile.getLocation().then(res => {
    if (res) return res.dataValues;
  });

  let experiences = await profile.getExperiences();
  let careerSummary = experiences.map(experience => {
    let startDate = moment(experience.startDate);
    let endDate = moment(experience.endDate);

    return {
      header: experience.organization,
      subheader: experience.jobTitle,
      content: experience.description,
      startDate: startDate,
      endDate: endDate
    };
  });

  let dbProjects = await profile.getProfileProjects();
  let projects = dbProjects.map(project => {
    return { text: project.description };
  });

  let education = await profile.getEducation();
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
    .getProfileOrganizations({ order: [["tier", "DESC"]] })
    .then(organizations => {
      let orgList = organizations.map(organization => {
        return {
          en: organization.descriptionEn,
          fr: organization.descriptionFr
        };
      });
      return orgList;
    });

  let skills = await profile.getSkills().map(skill => {
    if (skill)
      return {
        id: skill.dataValues.id,
        description: {
          en: skill.dataValues.descriptionEn,
          fr: skill.dataValues.descriptionFr
        }
      };
  });

  let competencies = await profile.getCompetencies().map(competencies => {
    if (competencies)
      return {
        id: competencies.dataValues.id,
        description: {
          en: competencies.dataValues.descriptionEn,
          fr: competencies.dataValues.descriptionFr
        }
      };
  });

  let allSkill = skills.concat(competencies);

  allSkill = allSkill.map(skill => skill.description);

  const options = {
    shouldSort: true,
    keys: ["en", "fr"],
    threshold: 0.2
  };

  const fuse = new Fuse(allSkill, options);

  const resultSkills = fuse
    .search(searchValue)
    .slice(0, NUMBER_OF_SKILL_RESULT);

  //Response Object
  let resData = {
    id: data.id,
    acting: {
      //this
      id: acting && privateInfo.info ? acting.id : null,
      description: acting && privateInfo.info ? acting.description : null
    },
    branch: data.branchEn,
    careerSummary: privateInfo.experience ? careerSummary : null,
    classification: {
      //this
      id: groupLevel && privateInfo.info ? groupLevel.id : null,
      description:
        groupLevel && privateInfo.info ? groupLevel.description : null
    },
    competencies,
    education: privateInfo.education ? educArray : null,
    email: data.email,
    exFeeder: privateInfo.talenManagement ? data.exFeeder : null,
    flagged: data.flagged,
    firstName: data.firstName,
    jobTitle: { en: data.jobTitleEn, fr: data.jobTitleFr },
    lastName: data.lastName,
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
    manager: privateInfo.manager ? data.manager : null,
    cellphone: data.cellphone,
    organizationList,
    skills: privateInfo.skill ? skills : null,
    team: data.team,
    telephone: data.telephone,
    projects: privateInfo.projects ? projects : null,
    resultSkills
  };
  return resData;
};

module.exports = getAllProfiles;
