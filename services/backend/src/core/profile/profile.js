const { validationResult } = require("express-validator");
const moment = require("moment");
const _ = require("lodash");
const prisma = require("../../database");

function normalizeDate(date, startOf) {
  if (date === null) {
    return date;
  }

  return date ? moment.utc(date).startOf(startOf).toISOString() : undefined;
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

async function updateProfile(request, response) {
  try {
    validationResult(request).throw();

    const userId = request.params.id;
    const { language } = request.query;

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

      if (branch && jobTitle && userIds.employmentInfoId) {
        prisma.employmentInfo.delete({
          where: {
            id: userIds.employmentInfoId,
          },
        });
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
          status,
          signupStep,

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
                create: educations.map(
                  ({ startDate, endDate, diplomaId, schoolId }) => ({
                    startDate: normalizeDate(startDate, "month"),
                    endDate: normalizeDate(endDate, "month"),
                    diploma: {
                      connect: {
                        id: diplomaId,
                      },
                    },
                    school: {
                      connect: {
                        id: schoolId,
                      },
                    },
                  })
                ),
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

          employmentInfo:
            jobTitle || branch
              ? {
                  upsert: {
                    create: {
                      translations: {
                        create: ["ENGLISH", "FRENCH"].map((lang) => ({
                          language: lang,
                          jobTitle: jobTitle ? jobTitle[lang] : "",
                          branch: branch ? branch[lang] : "",
                        })),
                      },
                    },
                    update: {
                      translations: {
                        updateMany: ["ENGLISH", "FRENCH"].map((lang) => ({
                          where: {
                            language: lang,
                          },
                          data: {
                            jobTitle: jobTitle && jobTitle[lang],
                            branch: branch && branch[lang],
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
                  officialLanguage: visibleCards.officialLanguage,
                  skills: visibleCards.skills,
                  competencies: visibleCards.competencies,
                  developmentalGoals: visibleCards.developmentalGoals,
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

async function getFullProfile(id, language) {
  const fullProfile = await prisma.user.findOne({
    where: { id },
    select: {
      id: true,
      createdAt: true,
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
      firstLanguage: true,
      secondLanguage: true,
      preferredLanguage: true,
      actingStartDate: true,
      actingEndDate: true,
      linkedin: true,
      github: true,
      gcconnex: true,
      exFeeder: true,
      interestedInRemote: true,
      status: true,
      projects: true,
      secondLangProfs: true,
      skills: {
        select: {
          skill: {
            select: {
              id: true,
              category: {
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
              id: true,
              translations: {
                select: {
                  description: true,
                  language: true,
                },
              },
            },
          },
          school: {
            select: {
              id: true,
              abbrCountry: true,
              abbrProvince: true,
              translations: {
                select: {
                  name: true,
                  language: true,
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
              id: true,
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
            select: {
              language: true,
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
      mentorshipSkills: {
        select: {
          skill: {
            select: {
              id: true,
              category: {
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
      connections: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      visibleCards: {
        select: {
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
  return fullProfile;
}

function filterProfileResult(profile, language) {
  let filteredProfile = {
    ...profile,
    nameInitials: `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`,
  };

  if (profile.skills) {
    const skills = profile.skills.map(({ skill }) => {
      if (skill.translations && skill.category.translations)
        return {
          id: skill.id,
          name: skill.translations[0].name,
          categoryId: skill.category.id,
          category: skill.category.translations[0].name,
        };
      return null;
    });

    filteredProfile.skills = _.sortBy(_.remove(skills, null), "name");
  }

  if (profile.mentorshipSkills) {
    const skills = profile.mentorshipSkills.map(({ skill }) => {
      if (skill.translations && skill.category.translations)
        return {
          id: skill.id,
          name: skill.translations[0].name,
          categoryId: skill.category.id,
          category: skill.category.translations[0].name,
        };
      return null;
    });

    filteredProfile.mentorshipSkills = _.sortBy(_.remove(skills, null), "name");
  }

  if (profile.competencies) {
    const competencies = profile.competencies.map(({ competency }) => {
      if (competency.translations)
        return {
          id: competency.id,
          name: competency.translations[0].name,
        };
      return null;
    });

    filteredProfile.competencies = _.sortBy(
      _.remove(competencies, null),
      "name"
    );
  }

  if (profile.developmentalGoals) {
    const developmentalGoals = profile.developmentalGoals.map((goal) => {
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
      return competency || skill;
    });

    filteredProfile.developmentalGoals = _.sortBy(
      _.remove(developmentalGoals, null),
      "name"
    );
  }

  if (profile.educations) {
    filteredProfile.educations = profile.educations.map((education) => {
      const translatedDiploma =
        education.diploma.translations.find((i) => i.language === language) ||
        education.diploma.translations[0];

      const translatedSchool =
        education.school.translations.find((i) => i.language === language) ||
        education.school.translations[0];

      return {
        id: education.id,
        startDate: education.startDate,
        endDate: education.endDate,
        diploma: {
          id: education.diploma.id,
          description: translatedDiploma ? translatedDiploma.description : null,
        },
        school: {
          id: education.school.id,
          country: education.school.abbrCountry,
          province: education.school.abbrProvince,
          name: translatedSchool ? translatedSchool.name : null,
        },
      };
    });
  }

  if (profile.experiences) {
    filteredProfile.experiences = profile.experiences.map((experience) => {
      const translatedExperience =
        experience.translations.find((i) => i.language === language) ||
        experience.translations[0];

      return {
        id: experience.id,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: translatedExperience
          ? translatedExperience.description
          : null,
        jobTitle: translatedExperience ? translatedExperience.jobTitle : null,
        organization: translatedExperience
          ? translatedExperience.organization
          : null,
      };
    });
  }

  if (profile.securityClearance) {
    filteredProfile.securityClearance = {
      id: profile.securityClearance.id,
      description: profile.securityClearance.translations[0]
        ? profile.securityClearance.translations[0].description
        : null,
    };
  }

  if (profile.lookingJob) {
    filteredProfile.lookingJob = {
      id: profile.lookingJob.id,
      description: profile.lookingJob.translations[0]
        ? profile.lookingJob.translations[0].description
        : null,
    };
  }

  if (profile.tenure) {
    filteredProfile.tenure = {
      id: profile.tenure.id,
      description: profile.tenure.translations[0]
        ? profile.tenure.translations[0].name
        : null,
    };
  }

  if (profile.careerMobility) {
    filteredProfile.careerMobility = {
      id: profile.careerMobility.id,
      description: profile.careerMobility.translations[0]
        ? profile.careerMobility.translations[0].description
        : null,
    };
  }

  if (profile.employmentInfo) {
    const trans = profile.employmentInfo.translations[0];
    filteredProfile.jobTitle = trans ? trans.jobTitle : null;
    filteredProfile.branch = trans ? trans.branch : null;
  }

  if (profile.talentMatrixResult) {
    filteredProfile.talentMatrixResult = {
      id: profile.talentMatrixResult.id,
      description: profile.talentMatrixResult.translations[0]
        ? profile.talentMatrixResult.translations[0].description
        : null,
    };
  }

  if (profile.officeLocation) {
    filteredProfile.officeLocation = {
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

  if (profile.relocationLocations) {
    filteredProfile.relocationLocations = filteredProfile.relocationLocations.map(
      ({ location }) => ({
        id: location.id,
        streetNumber: location.streetNumber,
        postalCode: location.postalCode,
        city: location.city,
        country: location.country,
        province: location.translations[0]
          ? location.translations[0].province
          : null,
        streetName: location.translations[0]
          ? location.translations[0].streetName
          : null,
      })
    );
  }

  filteredProfile.secondLangProfs = profile.secondLangProfs.map((prof) => {
    return {
      id: prof.id,
      date: prof.date,
      proficiency: prof.proficiency,
      level: prof.level,
    };
  });

  if (profile.organizations) {
    filteredProfile.organizations = profile.organizations.map((org) => {
      _.sortBy(org, "tier");
      return org.organizationTier.map((tier) => ({
        tier: tier.tier,
        id: tier.id,
        title: tier.translations[0].description,
      }));
    });
  }

  return filteredProfile;
}

async function getPrivateProfileById(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.params;
    const { language } = request.query;

    if (request.kauth.grant.access_token.content.sub === id) {
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
    const userId = request.kauth.grant.access_token.content.sub;
    const { id } = request.params;
    const { language } = request.query;
    if (userId && id) {
      const result = filterProfileResult(
        await getFullProfile(id, language),
        language
      );

      const isConnection = result.connections.some(
        (item) => item.id === userId
      );

      const tempCards = {
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
      };

      const hideCard = (key) =>
        result.visibleCards[key] === "PRIVATE" ||
        (result.visibleCards[key] === "CONNECTIONS" && !isConnection);

      if (hideCard("info")) {
        result.employmentInfo = null;
        result.securityClearance = null;
        result.groupLevel = null;
        result.tenure = null;
        result.actingLevel = null;
        result.actingStartDate = null;
        result.actingEndDate = null;
        result.firstLanguage = null;
        result.secondLanguage = null;
        result.secondLangProfs = null;

        tempCards.info = false;
      }
      if (hideCard("talentManagement")) {
        result.careerMobility = null;
        result.talentMatrixResult = null;

        tempCards.talentManagement = false;
      }

      if (hideCard("officialLanguage")) {
        result.firstLanguage = null;
        result.secondLanguage = null;

        tempCards.officialLanguage = false;
      }
      if (hideCard("skills")) {
        result.skills = [];

        tempCards.skills = false;
      }
      if (hideCard("competencies")) {
        result.competencies = [];

        tempCards.competencies = false;
      }

      if (hideCard("mentorshipSkills")) {
        result.mentorshipSkills = [];

        tempCards.mentorshipSkills = false;
      }

      if (hideCard("developmentalGoals")) {
        result.developmentalGoals = [];

        tempCards.developmentalGoals = false;
      }
      if (hideCard("education")) {
        result.educations = [];

        tempCards.education = false;
      }
      if (hideCard("experience")) {
        result.experiences = [];

        tempCards.experience = false;
      }
      if (hideCard("projects")) {
        result.projects = [];

        tempCards.projects = false;
      }
      if (hideCard("careerInterests")) {
        result.interestedInRemote = null;
        result.lookingJob = null;
        result.relocationLocations = null;

        tempCards.careerInterests = false;
      }
      if (hideCard("exFeeder")) {
        result.exFeeder = null;

        tempCards.exFeeder = false;
      }

      result.visibleCards = tempCards;

      response.status(200).json(result);
    }
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
