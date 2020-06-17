const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../database/client");

const prisma = new PrismaClient();

async function updateProfile(request, response) {
  try {
    validationResult(request).throw();
    const { id } = request.params;
    const { body } = request;
    const result = await prisma.users.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        team: body.team,
        telephone: body.telephone,
        cellphone: body.cellphone,
        linkedin: body.linkedin,
        github: body.github,
        gcconnex: body.gcconnex,
        manager: body.manager,
        firstLanguage: body.firstLanguage,
        secondLanguage: body.secondLanguage,
        preferredLanguage: body.preferredLanguage,
        actingStartDate: body.actingStartDate,
        actingEndDate: body.actingEndDate,
        interestedInRemote: body.interestedInRemote,
        exFeeder: body.exFeeder,
        mentoring: body.isMentor,
        name: body.name,
        nameInitials: body.nameInitials,
        avatarColor: body.avatarColor,
        email: body.email,
        status: body.status,
        projects: body.projects,
        skills: body.skills,
        competencies: body.competencies,
        developmentalGoals: body.developmentalGoals,
        educations: body.education,
        relocationLocations: body.relocationLocations,
        experiences: body.experience,

        officeLocation: { connect: { id: body.locationId } },
        careerMobility: { connect: { id: body.careerMobilityId } },
        tenure: { connect: { id: body.tenureId } },
        securityClearance: { connect: { id: body.securityClearanceId } },
        lookingJob: { connect: { id: body.lookingForANewJobId } },
        talentMatrixResult: { connect: { id: body.talentMatrixResultId } },
        groupLevel: { connect: { id: body.groupLevelId } },
        actingLevel: { connect: { id: body.actingLevelId } },
        employmentInfo: { connect: { id: body.employmentInfoId } },

        visibleCards: {
          update: {
            manager: body.manager,
            info: body.info,
            talentManagement: body.talentManagement,
            officialLanguage: body.officialLanguage,
            skills: body.skills,
            competencies: body.competencies,
            developmentalGoals: body.developmentalGoals,
            education: body.education,
            experience: body.experience,
            projects: body.projects,
            careerInterests: body.careerInterests,
            mentorshipSkills: body.mentorshipSkills,
            exFeeder: body.exFeeder,
          },
        },
      },
    });
    response.status(200).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).json("Unable to create profiles");
  }
}

async function getProfileStatusById(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.params;

    const getProfileFromDB = await prisma.users.findOne({ where: { id: id } });
    response.status(200).json({
      profile: { exists: !!getProfileFromDB },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json("Unable to create profiles");
  }
}

async function getFullProfile(id, language) {
  return prisma.users.findOne({
    where: { id },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      nameInitials: true,
      firstName: true,
      lastName: true,
      avatarColor: true,
      email: true,
      telephone: true,
      cellphone: true,
      manager: true,
      team: true,
      firstLanguage: true,
      secondLanguage: true,
      preferredLanguage: true,
      actingStartDate: true,
      actingEndDate: true,
      linkedin: true,
      github: true,
      gcconnex: true,
      exFeeder: true,
      mentoring: true,
      interestedInRemote: true,
      status: true,
      projects: true,
      secondLangProfs: true,
      skills: {
        select: {
          skill: {
            select: {
              id: true,
              translations: {
                where: {
                  language,
                },
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      competencies: {
        select: {
          competency: {
            select: {
              id: true,
              translations: {
                where: {
                  language,
                },
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      developmentalGoals: {
        select: {
          id: true,
          competency: {
            select: {
              id: true,
              translations: {
                where: {
                  language,
                },
                select: {
                  name: true,
                },
              },
            },
          },
          skill: {
            select: {
              id: true,
              translations: {
                where: {
                  language,
                },
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      educations: {
        select: {
          id: true,
          startDate: true,
          endDate: true,
          diploma: {
            select: {
              translations: {
                where: { language },
                select: {
                  description: true,
                },
              },
            },
          },
          school: {
            select: {
              abbrCountry: true,
              abbrProvince: true,
              translations: {
                where: { language },
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      relocationLocations: {
        select: {
          id: true,
          location: {
            select: {
              streetNumber: true,
              postalCode: true,
              city: true,
              country: true,
              translations: {
                where: { language },
                select: {
                  province: true,
                  streetName: true,
                },
              },
            },
          },
        },
      },
      experiences: {
        select: {
          id: true,
          startDate: true,
          endDate: true,
          translations: {
            where: { language },
            select: {
              description: true,
              jobTitle: true,
              organization: true,
            },
          },
        },
      },
      groupLevel: {
        select: {
          id: true,
          name: true,
        },
      },
      actingLevel: {
        select: {
          id: true,
          name: true,
        },
      },
      securityClearance: {
        select: {
          id: true,
          translations: {
            where: {
              language,
            },
            select: {
              description: true,
            },
          },
        },
      },
      lookingJob: {
        select: {
          id: true,
          translations: {
            where: {
              language,
            },
            select: {
              description: true,
            },
          },
        },
      },
      tenure: {
        select: {
          id: true,
          translations: {
            where: {
              language,
            },
            select: {
              name: true,
            },
          },
        },
      },
      careerMobility: {
        select: {
          id: true,
          translations: {
            where: {
              language,
            },
            select: {
              description: true,
            },
          },
        },
      },
      employmentInfo: {
        select: {
          id: true,
          translations: {
            where: {
              language,
            },
            select: {
              jobTitle: true,
              branch: true,
            },
          },
        },
      },
      talentMatrixResult: {
        select: {
          id: true,
          translations: {
            where: {
              language,
            },
            select: {
              description: true,
            },
          },
        },
      },
      officeLocation: {
        select: {
          id: true,
          postalCode: true,
          streetNumber: true,
          city: true,
          country: true,
          translations: {
            where: {
              language,
            },
            select: {
              streetName: true,
              province: true,
            },
          },
        },
      },
      visibleCards: {
        select: {
          manager: true,
          info: true,
          talentManagement: true,
          officialLanguage: true,
          skills: true,
          competencies: true,
          developmentalGoals: true,
          education: true,
          experience: true,
          projects: true,
          careerInterests: true,
          mentorshipSkills: true,
          exFeeder: true,
        },
      },
    },
  });
}

function filterProfileResult(profile) {
  let filteredProfile = profile;

  filteredProfile.skills = profile.skills.map((skill) => {
    if (skill.skill.translations)
      return {
        id: skill.skill.id,
        name: skill.skill.translations[0].name,
      };
    return null;
  });

  filteredProfile.competencies = profile.competencies.map((competency) => {
    if (competency.competency.translations)
      return {
        id: competency.competency.id,
        name: competency.competency.translations[0].name,
      };
    return null;
  });

  filteredProfile.developmentalGoals = profile.developmentalGoals.map(
    (goal) => {
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
      return {
        id: goal.id,
        competency,
        skill,
      };
    }
  );

  filteredProfile.educations = profile.educations.map((education) => {
    return {
      id: education.id,
      startDate: education.startDate,
      endDate: education.endDate,
      diploma: education.diploma.translations[0].description
        ? education.diploma.translations[0].description
        : null,
      school: {
        country: education.school.abbrCountry
          ? education.school.abbrCountry
          : null,
        province: education.school.abbrProvince
          ? education.school.abbrProvince
          : null,
        name: education.school.translations[0].name
          ? education.school.translations[0].name
          : null,
      },
    };
  });

  filteredProfile.experiences = profile.experiences.map((experience) => {
    return {
      id: experience.id,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.translations[0].description
        ? experience.translations[0].description
        : null,
      jobTitle: experience.translations[0].jobTitle
        ? experience.translations[0].jobTitle
        : null,
      organization: experience.translations[0].organization
        ? experience.translations[0].organization
        : null,
    };
  });

  filteredProfile.securityClearance = {
    id: profile.securityClearance.id,
    description: profile.securityClearance.translations[0].description
      ? profile.securityClearance.translations[0].description
      : null,
  };

  filteredProfile.lookingJob = {
    id: profile.lookingJob.id,
    description: profile.lookingJob.translations[0].description
      ? profile.lookingJob.translations[0].description
      : null,
  };

  filteredProfile.tenure = {
    id: profile.tenure.id,
    description: profile.tenure.translations[0].name
      ? profile.tenure.translations[0].name
      : null,
  };

  filteredProfile.careerMobility = {
    id: profile.careerMobility.id,
    description: profile.careerMobility.translations[0].description
      ? profile.careerMobility.translations[0].description
      : null,
  };

  filteredProfile.employmentInfo = {
    id: profile.employmentInfo.id,
    jobTitle: profile.employmentInfo.translations[0].jobTitle
      ? profile.employmentInfo.translations[0].jobTitle
      : null,
    branch: profile.employmentInfo.translations[0].branch
      ? profile.employmentInfo.translations[0].branch
      : null,
  };

  filteredProfile.talentMatrixResult = {
    id: profile.talentMatrixResult.id,
    description: profile.talentMatrixResult.translations[0].description
      ? profile.talentMatrixResult.translations[0].description
      : null,
  };

  filteredProfile.officeLocation = {
    id: profile.officeLocation.id,
    postalCode: profile.officeLocation.postalCode,
    streetNumber: profile.officeLocation.streetNumber,
    city: profile.officeLocation.city,
    country: profile.officeLocation.country,
    streetName: profile.officeLocation.translations[0].streetName
      ? profile.officeLocation.translations[0].streetName
      : null,
    province: profile.officeLocation.translations[0].province
      ? profile.officeLocation.translations[0].province
      : null,
  };

  filteredProfile.relocationLocations =
    filteredProfile.relocationLocations.location &&
    filteredProfile.relocationLocations.location.translations
      ? {
          id: profile.relocationLocations.id,
          streetNumber: profile.relocationLocations.location.streetNumber,
          postalCode: profile.relocationLocations.location.postalCode,
          city: profile.relocationLocations.location.city,
          country: profile.relocationLocations.location.country,
          province:
            profile.relocationLocations.location.translations[0].province,
          streetName:
            profile.relocationLocations.location.translations[0].streetName,
        }
      : [];

  filteredProfile.secondLangProfs = profile.secondLangProfs.map((prof) => {
    return {
      id: prof.id,
      date: prof.date,
      proficiency: prof.proficiency,
      level: prof.level,
    };
  });

  return filteredProfile;
}

async function getPrivateProfileById(request, response) {
  try {
    validationResult(request).throw();
    const { id } = request.params;
    const { language } = request.query;
    const filter = filterProfileResult(await getFullProfile(id, language));
    response.status(200).json(filter);
  } catch (error) {
    console.log(error);
    response.status(500).json("Unable to get profile");
  }
}

async function getPublicProfileById(request, response) {
  try {
    validationResult(request).throw();
    const { id } = request.params;
    const { language } = request.query;

    const unFilteredProfile = await getFullProfile(id, language);
    const result = filterProfileResult(unFilteredProfile);

    if (!result.visibleCards.manager) {
      delete result.manager;
    }
    if (!result.visibleCards.info) {
      delete result.employmentInfo;
      delete result.securityClearance;
      delete result.groupLevel;
      delete result.tenure;
      delete result.actingLevel;
      delete result.actingStartDate;
      delete result.actingEndDate;
      delete result.firstLanguage;
      delete result.secondLanguage;
    }
    if (!result.visibleCards.talentManagement) {
      delete result.careerMobility;
      delete result.talentMatrixResult;
    }
    if (!result.visibleCards.officialLanguage) {
      delete result.firstLanguage;
      delete result.secondLanguage;
    }
    if (!result.visibleCards.skills) {
      delete result.skills;
    }
    if (!result.visibleCards.competencies) {
      delete result.competencies;
    }
    if (!result.visibleCards.developmentalGoals) {
      delete result.developmentalGoals;
    }
    if (!result.visibleCards.education) {
      delete result.educations;
    }
    if (!result.visibleCards.experience) {
      delete result.experiences;
    }
    if (!result.visibleCards.projects) {
      delete result.projects;
    }
    if (!result.visibleCards.careerInterests) {
      delete result.interestedInRemote;
      delete result.lookingJob;
      delete result.relocationLocations;
    }
    if (!result.visibleCards.mentorshipSkills) {
      delete result.mentoring;
    }
    if (!result.visibleCards.exFeeder) {
      delete result.exFeeder;
    }

    response.status(200).json(result);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error getting information about the users");
  }
}

module.exports = {
  updateProfile,
  getPublicProfileById,
  getPrivateProfileById,
  getProfileStatusById,
};
