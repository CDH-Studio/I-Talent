const { validationResult } = require("express-validator");
const {
  isKeycloakUser,
  viewPrivateProfile,
  getKeycloakUserId,
} = require("../../utils/keycloak");
const getFullProfile = require("./util/getProfile");
const filterProfileResult = require("./util/filterProfileResult");
const filterProfileVisibility = require("./util/filterProfileVisibility");
const updateProfileInfo = require("./util/updateProfile");

async function updateProfile(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.params;
    const { language } = request.query;

    const isAdmin =
      request.kauth.grant.access_token.content.resource_access &&
      request.kauth.grant.access_token.content.resource_access[
        config.KEYCLOAK_CLIENT_ID
      ] &&
      request.kauth.grant.access_token.content.resource_access[
        config.KEYCLOAK_CLIENT_ID
      ].roles.includes("manage-users");

    if (request.kauth.grant.access_token.content.sub === userId) {
      const {
        firstName,
        lastName,
        teams,
        telephone,
        cellphone,
        linkedin,
        github,
        gcconnex,
        manager,
        firstLanguage,
        secondLanguage,
        preferredLanguage,
        actingStartDate,
        actingEndDate,
        interestedInRemote,
        exFeeder,
        avatarColor,
        status,
        signupStep,
        branch,
        jobTitle,
        description,

        projects,

        skills,
        mentorshipSkills,
        competencies,
        developmentalGoals,
        educations,
        relocationLocations,
        experiences,
        secondLangProfs,

        locationId,
        careerMobilityId,
        tenureId,
        securityClearanceId,
        lookingForANewJobId,
        talentMatrixResultId,
        groupLevelId,
        actingLevelId,
        organizations,

        visibleCards,
      } = request.body;

      // Used for updating/creating developmental goals
      let skillIds;
      let competencyIds;
      let upsertDevelopmentalGoals;
      if (developmentalGoals) {
        skillIds = await prisma.opSkill
          .findMany({
            where: { id: { in: developmentalGoals } },
            select: { id: true },
          })
          .then((i) => i.map((j) => j.id));

        competencyIds = await prisma.opCompetency
          .findMany({
            where: { id: { in: developmentalGoals } },
            select: { id: true },
          })
          .then((i) => i.map((j) => j.id));

        upsertDevelopmentalGoals = developmentalGoals.map((id) => {
          const isCompentency = competencyIds.includes(id);
          const isSkill = skillIds.includes(id);

          if (!isCompentency && !isSkill) {
            return undefined;
          }

          return {
            where: {
              userId_competencyId: isCompentency
                ? {
                    competencyId: id,
                    userId,
                  }
                : undefined,
              userId_skillId: isSkill
                ? {
                    skillId: id,
                    userId,
                  }
                : undefined,
            },
            create: {
              competency: isCompentency
                ? {
                    connect: {
                      id,
                    },
                  }
                : undefined,
              skill: isSkill
                ? {
                    connect: {
                      id,
                    },
                  }
                : undefined,
            },
            update: {},
          };
        });
      }

      // Deletes every experiences and educations if experiences or educations is defined since
      // there's no way to uniquely identify them solely from the data
      if (experiences) {
        await prisma.experience.deleteMany({ where: { userId } });
      }

      if (educations) {
        await prisma.education.deleteMany({ where: { userId } });
      }

      if (organizations) {
        const relatedOrgs = await prisma.organization.findMany({
          where: { userId },
          select: { id: true },
        });
        const orgTiers = await prisma.organizationTier.findMany({
          where: { organizationId: { in: relatedOrgs.map((org) => org.id) } },
          select: { id: true },
        });
        await prisma.transOrganization.deleteMany({
          where: {
            organizationTierId: {
              in: orgTiers.map((orgTier) => orgTier.id),
            },
          },
        });
        await prisma.organizationTier.deleteMany({
          where: { id: { in: orgTiers.map((orgTier) => orgTier.id) } },
        });
        await prisma.organization.deleteMany({ where: { userId } });
      }

      // Queries user ids to check if an id was already defined
      const userIds = await prisma.user.findOne({
        where: { id: userId },
        select: {
          officeLocationId: true,
          careerMobilityId: true,
          tenureId: true,
          securityClearanceId: true,
          lookingJobId: true,
          talentMatrixResultId: true,
          groupLevelId: true,
          actingLevelId: true,
          employmentInfoId: true,
        },
      });

      let employmentInfoLangs;
      if (branch || jobTitle) {
        if (branch && jobTitle) {
          employmentInfoLangs = _.uniq([
            ...Object.keys(branch),
            ...Object.keys(jobTitle),
          ]);
        } else if (branch) {
          employmentInfoLangs = Object.keys(branch);
        } else {
          employmentInfoLangs = Object.keys(jobTitle);
        }
      }

      // Does not let the user override the Admin INACTIVE status
      let statusValue = status;
      if (status && !isAdmin) {
        const currentStatus = await prisma.user.findOne({
          where: { id: userId },
          select: {
            status: true,
          },
        });

        if (currentStatus.status === "INACTIVE") {
          statusValue = undefined;
        }
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          firstName: firstName ? _.upperFirst(firstName) : undefined,
          lastName: lastName ? _.upperFirst(lastName) : undefined,
          teams: teams
            ? {
                set: teams,
              }
            : undefined,
          telephone,
          cellphone,
          linkedin,
          github,
          gcconnex,
          manager,
          firstLanguage,
          secondLanguage,
          preferredLanguage,
          actingStartDate: normalizeDate(actingStartDate, "day"),
          actingEndDate: normalizeDate(actingEndDate, "day"),
          interestedInRemote,
          exFeeder,
          avatarColor,
          status: statusValue,
          signupStep,
          description,

          projects: projects
            ? {
                set: projects,
              }
            : undefined,

          skills: skills
            ? {
                deleteMany: {
                  skillId: {
                    notIn: skills,
                  },
                },
                upsert: skills.map((id) => ({
                  where: {
                    userId_skillId: {
                      skillId: id,
                      userId,
                    },
                  },
                  create: {
                    skill: {
                      connect: {
                        id,
                      },
                    },
                  },
                  update: {},
                })),
              }
            : undefined,
          mentorshipSkills: mentorshipSkills
            ? {
                deleteMany: {
                  skillId: {
                    notIn: mentorshipSkills,
                  },
                },
                upsert: mentorshipSkills.map((id) => ({
                  where: {
                    userId_skillId: {
                      skillId: id,
                      userId,
                    },
                  },
                  create: {
                    skill: {
                      connect: {
                        id,
                      },
                    },
                  },
                  update: {},
                })),
              }
            : undefined,
          competencies: competencies
            ? {
                deleteMany: {
                  competencyId: {
                    notIn: competencies,
                  },
                },
                upsert: competencies.map((id) => ({
                  where: {
                    userId_competencyId: {
                      competencyId: id,
                      userId,
                    },
                  },
                  create: {
                    competency: {
                      connect: {
                        id,
                      },
                    },
                  },
                  update: {},
                })),
              }
            : undefined,
          developmentalGoals: developmentalGoals
            ? {
                deleteMany: {
                  competencyId: {
                    notIn: competencyIds,
                  },
                  skillId: {
                    notIn: skillIds,
                  },
                },
                upsert: upsertDevelopmentalGoals,
              }
            : undefined,
          relocationLocations: relocationLocations
            ? {
                deleteMany: {
                  locationId: {
                    notIn: relocationLocations,
                  },
                },
                upsert: relocationLocations.map((id) => ({
                  where: {
                    userId_locationId: {
                      locationId: id,
                      userId,
                    },
                  },
                  create: {
                    location: {
                      connect: {
                        id,
                      },
                    },
                  },
                  update: {},
                })),
              }
            : undefined,
          educations: educations
            ? {
                create: educations.map((educationItem) => ({
                  startDate: normalizeDate(educationItem.startDate, "month"),
                  endDate: normalizeDate(educationItem.endDate, "month"),
                  description: educationItem.description,
                  diploma: {
                    connect: {
                      id: educationItem.diplomaId,
                    },
                  },
                  school: {
                    connect: {
                      id: educationItem.schoolId,
                    },
                  },
                })),
              }
            : undefined,
          experiences: experiences
            ? {
                create: experiences.map((expItem) => ({
                  startDate: expItem.startDate,
                  endDate: expItem.endDate,
                  translations: {
                    create: {
                      language,
                      jobTitle: expItem.jobTitle,
                      organization: expItem.organization,
                      description: expItem.description,
                    },
                  },
                })),
              }
            : undefined,
          secondLangProfs: secondLangProfs
            ? {
                deleteMany: {
                  proficiency: {
                    notIn: secondLangProfs.map((i) => i.proficiency),
                  },
                },
                upsert: secondLangProfs.map((i) => ({
                  where: {
                    userId_proficiency: {
                      userId,
                      proficiency: i.proficiency,
                    },
                  },
                  create: i,
                  update: {
                    level: i.level,
                    date: normalizeDate(i.date, "day"),
                  },
                })),
              }
            : undefined,

          officeLocation: idHelper(locationId, userIds.officeLocationId),
          careerMobility: idHelper(careerMobilityId, userIds.careerMobilityId),
          tenure: idHelper(tenureId, userIds.tenureId),
          securityClearance: idHelper(
            securityClearanceId,
            userIds.securityClearanceId
          ),
          lookingJob: idHelper(lookingForANewJobId, userIds.lookingJobId),
          talentMatrixResult: idHelper(
            talentMatrixResultId,
            userIds.talentMatrixResultId
          ),
          groupLevel: idHelper(groupLevelId, userIds.groupLevelId),
          actingLevel: idHelper(actingLevelId, userIds.actingLevelId),

          employmentInfo: employmentInfoLangs
            ? {
                upsert: {
                  create: {
                    translations: {
                      create: employmentInfoLangs.map((lang) => ({
                        language: lang,
                        jobTitle: jobTitle ? jobTitle[lang] : undefined,
                        branch: branch ? branch[lang] : undefined,
                      })),
                    },
                  },
                  update: {
                    translations: {
                      updateMany: employmentInfoLangs.map((lang) => ({
                        where: {
                          language: lang,
                        },
                        data: {
                          jobTitle: jobTitle ? jobTitle[lang] : undefined,
                          branch: branch ? branch[lang] : undefined,
                        },
                      })),
                    },
                  },
                },
              }
            : undefined,

          organizations: organizations
            ? {
                create: organizations.map((org) => ({
                  organizationTier: {
                    create: org.map((orgTier) => ({
                      tier: orgTier.tier,
                      translations: {
                        create: [
                          {
                            language: "ENGLISH",
                            description: orgTier.title.ENGLISH,
                          },
                          {
                            language: "FRENCH",
                            description: orgTier.title.FRENCH,
                          },
                        ],
                      },
                    })),
                  },
                })),
              }
            : undefined,

          visibleCards: visibleCards
            ? {
                update: {
                  info: visibleCards.info,
                  talentManagement: visibleCards.talentManagement,
                  skills: visibleCards.skills,
                  competencies: visibleCards.competencies,
                  developmentalGoals: visibleCards.developmentalGoals,
                  description: visibleCards.description,
                  officialLanguage: visibleCards.officialLanguage,
                  education: visibleCards.education,
                  experience: visibleCards.experience,
                  projects: visibleCards.projects,
                  careerInterests: visibleCards.careerInterests,
                  mentorshipSkills: visibleCards.mentorshipSkills,
                  exFeeder: visibleCards.exFeeder,
                },
              }
            : undefined,
        },
      });

      response.status(200).json("Successfully updated profile");
      return;
    }

    response
      .status(403)
      .json({ data: "Access to private account has be denied." });
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).json("Unable to create profiles");
  }
}

async function getPrivateProfileById(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.params;
    const { language } = request.query;

    if (isKeycloakUser(request, id)) {
      const fullProfile = await getFullProfile(id, language);
      const filter = filterProfileResult(fullProfile, language);

      response.status(200).json(filter);
      return;
    }

    response
      .status(403)
      .json({ data: "Access to private account has be denied." });
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).json("Unable to get profile");
  }
}

async function getPublicProfileById(request, response) {
  try {
    validationResult(request).throw();

    const userId = getKeycloakUserId(request);
    const { id } = request.params;
    const { language } = request.query;

    if (userId && id) {
      const fullProfile = await getFullProfile(id, language);

      if (fullProfile.status !== "ACTIVE" && !viewPrivateProfile(request)) {
        response.sendStatus(404);
        return;
      }

      const result = filterProfileResult(fullProfile, language);
      const filteredResults = filterProfileVisibility(request, result, userId);

      response.status(200).json(filteredResults);
      return;
    }

    response.sendStatus(404);
    return;
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
};
