const { validationResult } = require("express-validator");
const moment = require("moment");
const { PrismaClient } = require("../../database/client");

const prisma = new PrismaClient();

function normalizeDate(date, startOf) {
  return date ? moment.utc(date).startOf(startOf).toISOString() : undefined;
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
        team,
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
        mentoring,
        nameInitials,
        avatarColor,
        status,
        signupStep,

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
        employmentInfoId,

        visibleCards,
      } = request.body;

      // Used for updating/creating developmental goals
      let skillIds;
      let competencyIds;
      let upsertDevelopmentalGoals;
      if (developmentalGoals) {
        skillIds = await prisma.opSkills
          .findMany({
            where: { id: { in: developmentalGoals } },
            select: { id: true },
          })
          .then((i) => i.map((j) => j.id));

        competencyIds = await prisma.opCompetencies
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

      const result = await prisma.users.update({
        where: { id: userId },
        data: {
          firstName,
          lastName,
          team,
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
          mentoring,
          nameInitials,
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
                deleteMany: {},
                upsert: educations.map(
                  ({ startDate, endDate, diplomaId, schoolId }) => ({
                    where: {
                      userId_schoolId_diplomaId_startDate: {
                        startDate: normalizeDate(startDate, "month"),
                        diplomaId,
                        schoolId,
                        userId,
                      },
                    },
                    create: {
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
                    },
                    update: {},
                  })
                ),
              }
            : undefined,
          experiences: experiences
            ? {
                deleteMany: {},
                create: experiences.map(
                  ({
                    startDate,
                    endDate,
                    jobTitle,
                    organization,
                    description,
                  }) => ({
                    startDate,
                    endDate,
                    translations: {
                      create: {
                        language,
                        jobTitle,
                        organization,
                        description,
                      },
                    },
                  })
                ),
              }
            : undefined,
          secondLangProfs: secondLangProfs
            ? {
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

          officeLocation: locationId
            ? {
                connect: { id: locationId },
              }
            : undefined,
          careerMobility: careerMobilityId
            ? {
                connect: { id: careerMobilityId },
              }
            : undefined,
          tenure: tenureId
            ? {
                connect: { id: tenureId },
              }
            : undefined,
          securityClearance: securityClearanceId
            ? {
                connect: { id: securityClearanceId },
              }
            : undefined,
          lookingJob: lookingForANewJobId
            ? {
                connect: { id: lookingForANewJobId },
              }
            : undefined,
          talentMatrixResult: talentMatrixResultId
            ? {
                connect: { id: talentMatrixResultId },
              }
            : undefined,
          groupLevel: groupLevelId
            ? {
                connect: { id: groupLevelId },
              }
            : undefined,
          actingLevel: actingLevelId
            ? {
                connect: { id: actingLevelId },
              }
            : undefined,
          employmentInfo: employmentInfoId
            ? {
                connect: { id: employmentInfoId },
              }
            : undefined,

          visibleCards: visibleCards
            ? {
                update: {
                  manager: visibleCards.manager,
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
      response.status(200).json(result);
      return;
    }
    response
      .status(403)
      .json({ data: "Access to private account has be denied." });
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
              id: true,
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
              id: true,
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
      mentorshipSkills: {
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

  filteredProfile.mentorshipSkills = profile.mentorshipSkills.map((skill) => {
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
      return competency || skill;
    }
  );

  filteredProfile.educations = profile.educations.map((education) => {
    return {
      id: education.id,
      startDate: education.startDate,
      endDate: education.endDate,
      diploma: {
        id: education.diploma.id,
        description: education.diploma.translations[0].description
          ? education.diploma.translations[0].description
          : null,
      },
      school: {
        id: education.school.id,
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

  if (profile.securityClearance) {
    filteredProfile.securityClearance = {
      id: profile.securityClearance.id,
      description: profile.securityClearance.translations[0].description
        ? profile.securityClearance.translations[0].description
        : null,
    };
  }

  if (profile.lookingJob) {
    filteredProfile.lookingJob = {
      id: profile.lookingJob.id,
      description: profile.lookingJob.translations[0].description
        ? profile.lookingJob.translations[0].description
        : null,
    };
  }

  if (profile.tenure) {
    filteredProfile.tenure = {
      id: profile.tenure.id,
      description: profile.tenure.translations[0].name
        ? profile.tenure.translations[0].name
        : null,
    };
  }

  if (profile.careerMobility) {
    filteredProfile.careerMobility = {
      id: profile.careerMobility.id,
      description: profile.careerMobility.translations[0].description
        ? profile.careerMobility.translations[0].description
        : null,
    };
  }

  if (profile.employmentInfo) {
    filteredProfile.employmentInfo = {
      id: profile.employmentInfo.id,
      jobTitle: profile.employmentInfo.translations[0].jobTitle
        ? profile.employmentInfo.translations[0].jobTitle
        : null,
      branch: profile.employmentInfo.translations[0].branch
        ? profile.employmentInfo.translations[0].branch
        : null,
    };
  }

  if (profile.talentMatrixResult) {
    filteredProfile.talentMatrixResult = {
      id: profile.talentMatrixResult.id,
      description: profile.talentMatrixResult.translations[0].description
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
      streetName: profile.officeLocation.translations[0].streetName
        ? profile.officeLocation.translations[0].streetName
        : null,
      province: profile.officeLocation.translations[0].province
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
        province: location.translations[0].province,
        streetName: location.translations[0].streetName,
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

  return filteredProfile;
}

async function getPrivateProfileById(request, response) {
  try {
    validationResult(request).throw();
    const { id } = request.params;
    if (request.kauth.grant.access_token.content.sub === id) {
      const { language } = request.query;
      const filter = filterProfileResult(await getFullProfile(id, language));
      response.status(200).json(filter);
      return;
    }
    response
      .status(403)
      .json({ data: "Access to private account has be denied." });
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
};
