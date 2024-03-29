const moment = require("moment");
const { uniq, upperFirst, flatten } = require("lodash");
const prisma = require("../../../database");
const { manageUsers } = require("../../../utils/keycloak");

function normalizeDate(date, startOf) {
  if (date === null) {
    return date;
  }

  if (date && moment(date, [moment.ISO_8601], true).isValid()) {
    return date;
  }

  return date ? moment(date).startOf(startOf).toISOString() : undefined;
}

function idHelper(id, savedId) {
  if (id === null && savedId) {
    return {
      disconnect: true,
    };
  }

  if (id === undefined || (id === null && !savedId)) {
    return undefined;
  }

  return {
    connect: { id },
  };
}

/**
 * Update a user in the database
 *
 * @param {Object} request
 * @param {string} userId The user to be updated
 * @param {"ENGLISH" | "FRENCH"} language The language used to update the users' information
 */
async function updateProfile(request, userId, language) {
  const {
    firstName,
    lastName,
    teams,
    telephone,
    cellphone,
    pri,
    linkedin,
    github,
    gcconnex,
    manager,
    firstLanguage,
    secondLanguage,
    preferredLanguage,
    interestedInRemote,
    exFeeder,
    avatarColor,
    status,
    signupStep,
    branch,
    jobTitle,
    description,
    employmentEquityGroups,
    skills,
    mentorshipSkills,
    competencies,
    developmentalGoals,
    developmentalGoalsAttachments,
    qualifiedPools,
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
  let deleteAll = [];

  if (experiences) {
    const attachmentLinkId = flatten(
      await Promise.all(
        experiences.map((ed) =>
          prisma.attachmentLink.findMany({
            where: { experienceId: ed.id },
            select: { id: true },
          })
        )
      )
    );
    if (attachmentLinkId.length > 0) {
      deleteAll.push(
        Promise.all(
          attachmentLinkId.map((a) =>
            prisma.attachmentLink.deleteMany({ where: { id: a.id } })
          )
        )
      );
      const attachmentLinkTransId = flatten(
        await Promise.all(
          attachmentLinkId.map((at) =>
            prisma.transAttachmentLink.findMany({
              where: { attachmentLinkId: at.id },
              select: { id: true },
            })
          )
        )
      );
      if (attachmentLinkTransId.length > 0)
        deleteAll.push(
          Promise.all(
            attachmentLinkTransId.map((a) =>
              prisma.transAttachmentLink.deleteMany({ where: { id: a.id } })
            )
          )
        );
    }
    deleteAll.push(prisma.experience.deleteMany({ where: { userId } }));
  }

  if (developmentalGoalsAttachments) {
    const attachmentLinkId = flatten(
      await prisma.attachmentLink.findMany({
        where: { userId },
        select: { id: true },
      })
    );
    if (attachmentLinkId.length > 0) {
      deleteAll.push(
        Promise.all(
          attachmentLinkId.map((a) =>
            prisma.attachmentLink.deleteMany({ where: { id: a.id } })
          )
        )
      );
      const attachmentLinkTransId = flatten(
        await Promise.all(
          attachmentLinkId.map((at) =>
            prisma.transAttachmentLink.findMany({
              where: { attachmentLinkId: at.id },
              select: { id: true },
            })
          )
        )
      );
      if (attachmentLinkTransId.length > 0)
        deleteAll.push(
          Promise.all(
            attachmentLinkTransId.map((a) =>
              prisma.transAttachmentLink.deleteMany({ where: { id: a.id } })
            )
          )
        );
    }
  }

  if (educations) {
    const attachmentLinkId = flatten(
      await Promise.all(
        educations.map((ed) =>
          prisma.attachmentLink.findMany({
            where: { educationId: ed.id },
            select: { id: true },
          })
        )
      )
    );

    if (attachmentLinkId.length > 0) {
      deleteAll.push(
        Promise.all(
          attachmentLinkId.map((a) =>
            prisma.attachmentLink.deleteMany({ where: { id: a.id } })
          )
        )
      );
      const attachmentLinkTransId = flatten(
        await Promise.all(
          attachmentLinkId.map((at) =>
            prisma.transAttachmentLink.findMany({
              where: { attachmentLinkId: at.id },
              select: { id: true },
            })
          )
        )
      );
      if (attachmentLinkTransId.length > 0)
        deleteAll.push(
          Promise.all(
            attachmentLinkTransId.map((a) =>
              prisma.transAttachmentLink.deleteMany({ where: { id: a.id } })
            )
          )
        );
    }
    deleteAll.push(prisma.education.deleteMany({ where: { userId } }));
  }

  if (qualifiedPools) {
    deleteAll.push(prisma.qualifiedPool.deleteMany({ where: { userId } }));
  }

  await Promise.all(deleteAll);

  if (organizations) {
    const relatedOrgs = await prisma.organization.findMany({
      where: { userId },
      select: { id: true },
    });
    const orgTiers = await prisma.organizationTier.findMany({
      where: { organizationId: { in: relatedOrgs.map((org) => org.id) } },
      select: { id: true },
    });
    await Promise.all([
      prisma.transOrganization.deleteMany({
        where: {
          organizationTierId: {
            in: orgTiers.map((orgTier) => orgTier.id),
          },
        },
      }),

      prisma.organizationTier.deleteMany({
        where: { id: { in: orgTiers.map((orgTier) => orgTier.id) } },
      }),
      prisma.organization.deleteMany({ where: { userId } }),
    ]);
  }

  // Queries user ids to check if an id was already defined
  const userIds = await prisma.user.findUnique({
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
      employmentInfoLangs = uniq([
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
  if (status && !manageUsers(request)) {
    const currentStatus = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        status: true,
      },
    });

    if (currentStatus.status === "INACTIVE") {
      statusValue = undefined;
    }
  }

  const savedSignupStep = (
    await prisma.user.findUnique({
      where: { id: userId },
      select: { signupStep: true },
    })
  ).signupStep;

  await prisma.user.update({
    where: { id: userId },
    data: {
      firstName: firstName ? upperFirst(firstName) : undefined,
      lastName: lastName ? upperFirst(lastName) : undefined,
      teams: teams
        ? {
            set: teams,
          }
        : undefined,
      telephone,
      cellphone,
      pri,
      linkedin,
      github,
      gcconnex,
      manager,
      firstLanguage,
      secondLanguage,
      preferredLanguage,
      interestedInRemote,
      exFeeder,
      avatarColor,
      status: statusValue,
      signupStep:
        signupStep && signupStep > savedSignupStep ? signupStep : undefined,
      description,

      employmentEquityGroups: employmentEquityGroups
        ? {
            set: employmentEquityGroups,
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

      developmentalGoalsAttachments:
        developmentalGoalsAttachments &&
        developmentalGoalsAttachments.length > 0
          ? {
              create: developmentalGoalsAttachments.map((link) => ({
                translations: {
                  create: {
                    language,
                    name: {
                      connect: {
                        id: link.nameId,
                      },
                    },
                    url: link.url,
                  },
                },
              })),
            }
          : undefined,

      relocationLocations: relocationLocations
        ? {
            deleteMany: {
              relocationLocationId: {
                notIn: relocationLocations,
              },
            },
            upsert: relocationLocations.map((id) => ({
              where: {
                userId_relocationLocationId: {
                  relocationLocationId: id,
                  userId,
                },
              },
              create: {
                relocationLocation: {
                  connect: {
                    id,
                  },
                },
              },
              update: {},
            })),
          }
        : undefined,

      qualifiedPools:
        qualifiedPools && qualifiedPools.length > 0
          ? {
              create: qualifiedPools.map((qualifiedPoolItem) => ({
                jobTitle: qualifiedPoolItem.jobTitle,
                selectionProcessNumber:
                  qualifiedPoolItem.selectionProcessNumber,
                jobPosterLink: qualifiedPoolItem.jobPosterLink,
                classification: {
                  connect: {
                    id: qualifiedPoolItem.classificationId,
                  },
                },
              })),
            }
          : undefined,

      educations:
        educations && educations.length > 0
          ? {
              create: educations.map((educationItem) => ({
                startDate: normalizeDate(educationItem.startDate, "month"),
                endDate: normalizeDate(educationItem.endDate, "month"),
                ongoingDate: educationItem.ongoingDate,
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
                attachmentLinks:
                  educationItem.attachmentLinks &&
                  educationItem.attachmentLinks.length > 0
                    ? {
                        create: educationItem.attachmentLinks.map((link) => ({
                          translations: {
                            create: {
                              language,
                              name: {
                                connect: {
                                  id: link.nameId,
                                },
                              },
                              url: link.url,
                            },
                          },
                        })),
                      }
                    : undefined,
              })),
            }
          : undefined,

      experiences:
        experiences && experiences.length > 0
          ? {
              create: experiences.map((expItem) => ({
                startDate: normalizeDate(expItem.startDate, "month"),
                endDate: normalizeDate(expItem.endDate, "month"),
                ongoingDate: expItem.ongoingDate,
                projects: expItem.projects
                  ? {
                      set: expItem.projects,
                    }
                  : undefined,
                translations: {
                  create: {
                    language,
                    jobTitle: expItem.jobTitle,
                    organization: expItem.organization,
                    description: expItem.description,
                  },
                },
                attachmentLinks:
                  expItem.attachmentLinks && expItem.attachmentLinks.length > 0
                    ? {
                        create: expItem.attachmentLinks.map((link) => ({
                          translations: {
                            create: {
                              language,
                              name: {
                                connect: {
                                  id: link.nameId,
                                },
                              },
                              url: link.url,
                            },
                          },
                        })),
                      }
                    : undefined,
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
                status: i.status,
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
            create: {
              organizationTier: {
                create: organizations.map((orgTier) => ({
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
            },
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
              qualifiedPools: visibleCards.qualifiedPools,
              education: visibleCards.education,
              experience: visibleCards.experience,
              careerInterests: visibleCards.careerInterests,
              mentorshipSkills: visibleCards.mentorshipSkills,
              exFeeder: visibleCards.exFeeder,
              employmentEquityGroup: visibleCards.employmentEquityGroup,
            },
          }
        : undefined,
    },
  });
}

module.exports = updateProfile;
