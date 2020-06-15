const { PrismaClient } = require("../../database/client");

const prisma = new PrismaClient();

async function updateProfile(request, response) {
  const { id } = request.params;
  const { body } = request;
  const profile = {
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

    // Find where these occur once we start working on frontend
    // actingLevel: null,
    // employmentInfo: null,
    // projects: null,
    // status: body.status,

    officeLocation: { connect: { id: body.locationId } },
    careerMobility: { connect: { id: body.careerMobilityId } },
    tenure: { connect: { id: body.tenureId } },
    securityClearance: { connect: { id: body.securityClearanceId } },
    lookingJob: { connect: { id: body.lookingForANewJobId } },
    talentMatrixResult: { connect: { id: body.talentMatrixResultId } },
    groupLevel: { connect: { id: body.groupLevelId } },
  };
  prisma.users
    .update({ where: { id }, data: { profile } })
    .then((result) => response.status(200).json(result))
    .catch((error) => {
      console.log(error);
      response.status(500).json("Unable to create profiles");
    });
}

async function getProfileStatusById(request, response) {
  const { id } = request.params;
  try {
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
    where: { id: id },
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
      skills: true,
      competencies: true,
      developmentalGoals: true,
      educations: true,
      relocationLocations: true,
      experiences: true,

      groupLevel: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      actingLevel: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      securityClearance: {
        select: {
          translations: {
            where: {
              language,
            },
            select: {
              id: true,
              description: true,
              createdAt: true,
              updatedAt: true,
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
              id: true,
              createdAt: true,
              updatedAt: true,
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
              id: true,
              createdAt: true,
              updatedAt: true,
              name: true,
            },
          },
        },
      },
      careerMobility: {
        select: {
          translations: {
            where: {
              language,
            },
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              description: true,
            },
          },
        },
      },
      employmentInfo: {
        select: {
          translations: {
            where: {
              language,
            },
            select: {
              id: true,
              jobTitle: true,
              branch: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
      talentMatrixResult: {
        select: {
          translations: {
            where: {
              language,
            },
            select: {
              id: true,
              description: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
      officeLocation: {
        select: {
          postalCode: true,
          streetNumber: true,
          city: true,
          country: true,
          translations: {
            where: {
              language,
            },
            select: {
              id: true,
              streetName: true,
              province: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
      visibleCards: {
        select: {
          id: true,
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
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
}

async function getPrivateProfileById(request, response) {
  const { id } = request.params;
  const { language } = request.query;
  try {
    const result = await getFullProfile(id, language);
    response.status(200).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).json("Unable to get profile");
  }
}

async function getPublicProfileById(request, response) {
  const { id } = request.params;
  const { language } = request.query;
  try {
    const result = await getFullProfile(id, language);

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
    response.status(500).json("Unable to get profile");
  }
}

module.exports = {
  updateProfile,
  getPublicProfileById,
  getPrivateProfileById,
  getProfileStatusById,
};
