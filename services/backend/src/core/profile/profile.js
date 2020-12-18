const _ = require("lodash");

const {
  isKeycloakUser,
  getKeycloakUserId,
  manageUsers,
} = require("../../utils/keycloak");
const prisma = require("../../database");
const { hasMultipleVisibility } = require("./util/profileVisibility");

// async function updateProfile(request, response) {
//   const { id } = request.params;
//   const { language } = request.query;

//   if (isKeycloakUser(request, id)) {
//     await updateProfileInfo(request, id, language);

//     response.sendStatus(204);
//   } else {
//     response.sendStatus(403);
//   }
// }

// async function getPrivateProfileById(request, response) {
//   const { id } = request.params;
//   const { language } = request.query;

//   if (isKeycloakUser(request, id)) {
//     const fullProfile = await getFullProfile(id, language);
//     const filter = formatProfileResult(fullProfile, language);

//     response.status(200).json(filter);
//   } else {
//     response.sendStatus(403);
//   }
// }

// async function getPublicProfileById(request, response) {
//   const userId = getKeycloakUserId(request);
//   const { id } = request.params;
//   const { language } = request.query;

//   const fullProfile = await getFullProfile(id, language);

//   if (fullProfile.status !== "ACTIVE" && !viewPrivateProfile(request)) {
//     response.sendStatus(404);
//     return;
//   }

//   let result = formatProfileResult(fullProfile, language);
//   // filter the visibility of cards if user does not have elevated permission
//   if (!viewPrivateProfile(request)) {
//     result = filterProfileVisibility(request, result, userId);
//   }

//   response.status(200).json(result);
// }

// module.exports = {
//   updateProfile,
//   getPublicProfileById,
//   getPrivateProfileById,
// };

async function deleteProfile(request, response) {
  const { userId } = request.params;

  if (manageUsers(request) || isKeycloakUser(request, userId)) {
    await prisma.$transaction([
      prisma.competency.deleteMany({ where: { userId } }),
      prisma.mentorshipSkill.deleteMany({ where: { userId } }),
      prisma.skill.deleteMany({ where: { userId } }),
      prisma.developmentalGoal.deleteMany({ where: { userId } }),
      prisma.secondLangProf.deleteMany({ where: { userId } }),
      prisma.organization.deleteMany({ where: { userId } }),
      prisma.education.deleteMany({ where: { userId } }),
      prisma.qualifiedPool.deleteMany({ where: { userId } }),
      prisma.experience.deleteMany({ where: { userId } }),
      prisma.relocationLocation.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);
    response.sendStatus(204);
  } else {
    response.sendStatus(403);
  }
}

async function updateProfile(request, response) {}

async function getProfile(request, response) {
  const { userId } = request.params;
  const { language } = request.query;

  const keycloakId = getKeycloakUserId(request);

  const [
    infoVisible,
    talentManagementVisible,
    descriptionVisible,
    officialLanguageVisible,
    employmentEquityGroupVisible,
    careerInterestsVisible,
    exFeederVisible,
  ] = await hasMultipleVisibility(userId, keycloakId, [
    "info",
    "talentManagement",
    "description",
    "officialLanguage",
    "employmentEquityGroup",
    "careerInterests",
    "exFeeder",
  ]);

  let profile = await prisma.user.findOne({
    where: {
      id: userId,
    },
    select: {
      id: true,
      updatedAt: true,
      name: true,
      firstName: true,
      lastName: true,
      avatarColor: true,
      email: true,
      telephone: true,
      cellphone: true,
      manager: true,
      teams: true,
      firstLanguage: officialLanguageVisible,
      secondLanguage: officialLanguageVisible,
      preferredLanguage: true,
      actingStartDate: infoVisible,
      actingEndDate: infoVisible,
      linkedin: true,
      github: true,
      gcconnex: true,
      exFeeder: exFeederVisible,
      interestedInRemote: careerInterestsVisible,
      status: true,
      employmentEquityGroups: employmentEquityGroupVisible,
      description: descriptionVisible,
      groupLevel: infoVisible && {
        select: {
          id: true,
          name: true,
        },
      },
      actingLevel: infoVisible && {
        select: {
          id: true,
          name: true,
        },
      },
      securityClearance: infoVisible && {
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
      lookingJob: careerInterestsVisible && {
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
      tenure: infoVisible && {
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
      careerMobility: talentManagementVisible && {
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
      employmentInfo: infoVisible && {
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
      talentMatrixResult: talentManagementVisible && {
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
      connections: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      organizations: {
        select: {
          id: true,
          organizationTier: {
            select: {
              id: true,
              tier: true,
              translations: {
                where: { language },
                select: {
                  id: true,
                  language: true,
                  description: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (profile.securityClearance) {
    profile.securityClearance = {
      id: profile.securityClearance.id,
      description: profile.securityClearance.translations[0]
        ? profile.securityClearance.translations[0].description
        : null,
    };
  }

  if (profile.lookingJob) {
    profile.lookingJob = {
      id: profile.lookingJob.id,
      description: profile.lookingJob.translations[0]
        ? profile.lookingJob.translations[0].description
        : null,
    };
  }

  if (profile.tenure) {
    profile.tenure = {
      id: profile.tenure.id,
      description: profile.tenure.translations[0]
        ? profile.tenure.translations[0].name
        : null,
    };
  }

  if (profile.careerMobility) {
    profile.careerMobility = {
      id: profile.careerMobility.id,
      description: profile.careerMobility.translations[0]
        ? profile.careerMobility.translations[0].description
        : null,
    };
  }

  if (profile.employmentInfo) {
    const trans = profile.employmentInfo.translations[0];
    profile.jobTitle = trans ? trans.jobTitle : null;
    profile.branch = trans ? trans.branch : null;
  }

  if (profile.talentMatrixResult) {
    profile.talentMatrixResult = {
      id: profile.talentMatrixResult.id,
      description: profile.talentMatrixResult.translations[0]
        ? profile.talentMatrixResult.translations[0].description
        : null,
    };
  }

  if (profile.officeLocation) {
    profile.officeLocation = {
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

  if (profile.organizations) {
    profile.organizations = profile.organizations.map((org) => {
      _.sortBy(org, "tier");
      return org.organizationTier.map((tier) => ({
        tier: tier.tier,
        id: tier.id,
        title: tier.translations[0].description,
      }));
    });
  }

  response.status(200).json(profile);
}

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
