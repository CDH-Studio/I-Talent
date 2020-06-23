const Fuse = require("fuse.js");

const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

const NUMBER_OF_SKILL_RESULT = 4;

async function getAllUsers(searchValue, language) {
  const visibleCards = await prisma.users.findMany({
    select: {
      id: true,
      visibleCards: true,
    },
    where: {
      status: "ACTIVE",
    },
  });

  const users = await Promise.all(
    visibleCards.map(
      ({
        id,
        visibleCards: {
          info,
          manager,
          projects,
          skills,
          competencies,
          education,
          exFeeder,
          experience,
        },
      }) =>
        prisma.users.findOne({
          where: {
            id,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            telephone: true,
            cellphone: true,
            manager,
            team: true,
            exFeeder,
            status: true,
            email: true,
            avatarColor: true,
            projects,
            groupLevel: info && {
              select: {
                id: true,
                name: true,
              },
            },
            actingLevel: info && {
              select: {
                id: true,
                name: true,
              },
            },
            employmentInfo: {
              select: {
                translations: {
                  where: {
                    language,
                  },
                  select: {
                    branch: true,
                    jobTitle: true,
                  },
                },
              },
            },
            officeLocation: {
              select: {
                id: true,
                city: true,
                streetNumber: true,
                translations: {
                  where: {
                    language,
                  },
                  select: {
                    province: true,
                    streetName: true,
                  },
                },
              },
            },
            experiences: experience && {
              select: {
                startDate: true,
                endDate: true,
                translations: {
                  where: {
                    language,
                  },
                  select: {
                    description: true,
                    jobTitle: true,
                    organization: true,
                  },
                },
              },
            },
            educations: education && {
              select: {
                startDate: true,
                endDate: true,
                diploma: {
                  select: {
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
                school: {
                  select: {
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
            skills: skills && {
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
            competencies: competencies && {
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
            organizations: {
              orderBy: {
                tier: "desc",
              },
              select: {
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
          },
        })
    )
  );

  const cleanedUsers = users.map((user) => {
    let allSkills = [];
    const info = {
      ...user,
      nameInitials: `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`,
    };

    if (info.employmentInfo) {
      const employment = info.employmentInfo.translations[0];
      info.branch = employment ? employment.branch : undefined;
      info.jobTitle = employment ? employment.jobTitle : undefined;
      delete info.employmentInfo;
    }

    if (info.officeLocation) {
      const location = info.officeLocation.translations[0];
      info.officeLocation.province = location ? location.province : undefined;
      info.officeLocation.streetName = location
        ? location.streetName
        : undefined;
      delete info.officeLocation.translations;
    }

    if (info.experiences) {
      info.experiences = info.experiences.map((i) => {
        const trans = i.translations[0];

        return {
          startDate: i.startDate,
          endDate: i.endDate,
          description: trans ? trans.description : undefined,
          jobTitle: trans ? trans.jobTitle : undefined,
          organization: trans ? trans.organization : undefined,
        };
      });
    }

    if (info.educations) {
      info.educations = info.educations.map((i) => {
        const diploma = i.diploma.translations[0];
        const school = i.school.translations[0];

        return {
          startDate: i.startDate,
          endDate: i.endDate,
          diploma: diploma ? diploma.description : undefined,
          school: school ? school.name : undefined,
        };
      });
    }

    if (info.skills) {
      info.skills = info.skills.map(({ skill }) => {
        const trans = skill.translations[0];

        return {
          id: skill.id,
          name: trans ? trans.name : undefined,
        };
      });

      allSkills = [...info.skills];
    }

    if (info.competencies) {
      info.competencies = info.competencies.map(({ competency }) => {
        const trans = competency.translations[0];

        return {
          id: competency.id,
          name: trans ? trans.name : undefined,
        };
      });

      allSkills = [...allSkills, ...info.competencies];
    }

    info.organizations = info.organizations.map((i) => {
      const trans = i.translations[0];

      return trans ? trans.description : undefined;
    });

    const fuse = new Fuse(allSkills, {
      shouldSort: true,
      threshold: 0.2,
      keys: ["name"],
    });

    const resultSkills = fuse
      .search(searchValue)
      .slice(0, NUMBER_OF_SKILL_RESULT)
      .map(({ item }) => item);

    info.resultSkills = resultSkills;

    return info;
  });

  return cleanedUsers;
}

module.exports = getAllUsers;
