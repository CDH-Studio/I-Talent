const moment = require("moment");

const Models = require("../../models");

const Profile = Models.profile;
const Education = Models.education;
const Experience = Models.experience;
const ProfileOrganization = Models.profileOrganization;
const Project = Models.profileProject;
const SecLang = Models.secondLanguageProficiency;
const RelocationLocation = Models.relocationLocation;
const Location = Models.location;

const mappedValues = require("./mappedValues.json");

const updateProfile = async (request, response) => {
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
    if (!dbObject.secondLanguage) {
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
};

module.exports = {
  updateProfile,
};
