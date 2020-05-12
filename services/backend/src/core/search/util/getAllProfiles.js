const moment = require("moment");
const Fuse = require("fuse.js");

const Models = require("../../../database/models");

const Profile = Models.profile;
const User = Models.user;

const NUMBER_OF_SKILL_RESULT = 4;

function getProf(profile, searchValue) {
  const user = Profile.getUser({
    attributes: ["email", "avatarColor", "nameInitials"],
  });

  if (!profile) response.status(404).send("Profile Not Found");

  const privateInfo = profile.visibleCards;

  const profileData = profile ? profile.dataValues : {};
  const userData = user ? user.dataValues : {};

  const data = { ...profileData, ...userData };

  const groupLevel = Profile.getGroupLevel().then((res) => {
    if (res) return res.dataValues;
  });

  const acting = Profile.getActing().then((res) => {
    if (res) return res.dataValues;
  });

  const location = Profile.getLocation().then((res) => {
    if (res) return res.dataValues;
  });

  const experiences = Profile.getExperiences();
  const careerSummary = experiences.map((experience) => {
    const startDate = moment(experience.startDate);
    const endDate = moment(experience.endDate);

    return {
      header: experience.organization,
      subheader: experience.jobTitle,
      content: experience.description,
      startDate: startDate,
      endDate: endDate,
    };
  });

  const dbProjects = Profile.getProfileProjects();
  const projects = dbProjects.map((project) => {
    return { text: project.description };
  });

  const education = Profile.getEducation();
  const educations = () => {
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

  const educArray = educations();

  const organizationList = Profile.getProfileOrganizations({
    order: [["tier", "DESC"]],
  }).then((organizations) => {
    const orgList = organizations.map((organization) => {
      return {
        en: organization.descriptionEn,
        fr: organization.descriptionFr,
      };
    });
    return orgList;
  });

  const skills = Profile.getSkills().map(async (skill) => {
    if (skill) {
      return {
        id: skill.dataValues.id,
        description: {
          en: skill.dataValues.descriptionEn,
          fr: skill.dataValues.descriptionFr,
        },
      };
    }
  });

  const competencies = Profile.getCompetencies().map((competencies) => {
    if (competencies)
      return {
        id: competencies.dataValues.id,
        description: {
          en: competencies.dataValues.descriptionEn,
          fr: competencies.dataValues.descriptionFr,
        },
      };
  });

  let allSkill = skills.concat(competencies);

  allSkill = allSkill.map((skill) => skill.description);

  const options = {
    shouldSort: true,
    keys: ["en", "fr"],
    threshold: 0.2,
  };

  const fuse = new Fuse(allSkill, options);

  const resultSkills = fuse
    .search(searchValue)
    .slice(0, NUMBER_OF_SKILL_RESULT);

  // Response Object
  const resData = {
    id: data.id,
    acting: {
      // this
      id: acting && privateInfo.info ? acting.id : null,
      description: acting && privateInfo.info ? acting.description : null,
    },
    branch: data.branchEn,
    careerSummary: privateInfo.experience ? careerSummary : null,
    classification: {
      // this
      id: groupLevel && privateInfo.info ? groupLevel.id : null,
      description:
        groupLevel && privateInfo.info ? groupLevel.description : null,
    },
    competencies,
    education: privateInfo.education ? educArray : null,
    email: data.email,
    avatarColor: data.avatarColor,
    nameInitials: data.nameInitials,
    exFeeder: privateInfo.talenManagement ? data.exFeeder : null,
    flagged: data.flagged,
    firstName: data.firstName,
    jobTitle: { en: data.jobTitleEn, fr: data.jobTitleFr },
    lastName: data.lastName,
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
    manager: privateInfo.manager ? data.manager : null,
    cellphone: data.cellphone,
    organizationList,
    skills: privateInfo.skills ? skills : null,
    team: data.team,
    telephone: data.telephone,
    projects: privateInfo.projects ? projects : null,
    resultSkills,
  };
  return resData;
}

function getProfs(profiles, searchValue) {
  return Promise.all(
    profiles.map((profile) => {
      return getProf(profile, searchValue);
    })
  );
}

async function getAllProfiles(searchValue) {
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
      "visibleCards",
    ],
    include: [
      { model: User, attributes: ["inactive"], where: { inactive: false } },
    ],
    where: {
      flagged: false,
    },
  });
  const allProf = await getProfs(profiles, searchValue).then((profs) => profs);

  return allProf;
}

module.exports = getAllProfiles;
