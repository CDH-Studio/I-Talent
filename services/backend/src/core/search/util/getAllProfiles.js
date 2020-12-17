const _ = require("lodash");
const prisma = require("../../../database");
const { viewPrivateProfile } = require("../../../utils/keycloak");

async function getAllUsers(language, userId, request) {
  let data = await prisma.user.findMany({
    select: {
      id: true,
      visibleCards: true,
      connections: {
        select: {
          id: true,
        },
      },
    },
    where: viewPrivateProfile(request)
      ? undefined
      : {
          status: "ACTIVE",
        },
  });

  console.log(data);

  console.warn("all profiles", data);

  let visibleCards = await Promise.all(
    data.map(
      async ({
        id,
        visibleCards: {
          info,
          skills,
          competencies,
          education,
          qualifiedPools,
          experience,
          exFeeder,
        },
        connections,
      }) => {
        const isConnection =
          id === userId || connections.some((item) => item.id === userId);

        const visibleCardBool = (value) =>
          !(value === "PRIVATE" || (value === "CONNECTIONS" && !isConnection));

        return {
          id,
          visibleCards: {
            info: visibleCardBool(info),
            skills: visibleCardBool(skills),
            competencies: visibleCardBool(competencies),
            education: visibleCardBool(education),
            qualifiedPools: visibleCardBool(qualifiedPools),
            experience: visibleCardBool(experience),
            exFeeder: visibleCardBool(exFeeder),
          },
          isConnection: isConnection && id === userId ? false : isConnection,
        };
      }
    )
  );

  console.warn("all profiles infos visibleCards", visibleCards);
  const users = await Promise.all(
    visibleCards.map(
      async ({
        id,
        visibleCards: {
          info,
          skills,
          competencies,
          education,
          qualifiedPools,
          experience,
          exFeeder,
          mentorshipSkills,
        },
        isConnection,
      }) => {
        const userData = await prisma.user.findOne({
          where: {
            id,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            telephone: true,
            cellphone: true,
            manager: true,
            teams: true,
            status: true,
            email: true,
            exFeeder,
            avatarColor: true,
            tenure: info && {
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
                projects: true,
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
            qualifiedPools: qualifiedPools && {
              select: {
                jobTitle: true,
                selectionProcessNumber: true,
                jobPosterLink: true,
                classification: {
                  select: {
                    name: true,
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
            mentorshipSkills: mentorshipSkills && {
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
            organizations: {
              select: {
                organizationTier: {
                  orderBy: {
                    tier: "asc",
                  },
                  select: {
                    tier: true,
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
            },
          },
        });

        userData.isConnection = isConnection;

        return userData;
      }
    )
  );
  console.warn("****all profiles users", users);
  // console.warn("all profiles    users[0]", users[0]);
  // console.warn("all profiles    users[0] id", users[0].id);
  // console.warn("all profiles tenure", users[0].tenure);
  // console.warn(
  //   "all profiles tenure translations",
  //   users[0].tenure.translations
  // );
  // console.warn(
  //   "all profiles employmentInfo translations",
  //   users[0].employmentInfo.translations
  // );

  // console.warn(
  //   "all profiles employmentInfo",
  //   users[0].employmentInfo.translations
  // );

  // console.warn(
  //   "all profiles officeLocation",
  //   users[0].officeLocation.translations
  // );

  // console.warn("all profiles experiences", users[0].experiences);
  // console.warn(
  //   "all profiles experiences translations",
  //   users[0].experiences[0].translations
  // );
  // // console.warn(
  // //   "all profiles experiences translations",
  // //   users[0].experiences[1].translations
  // // );

  // console.warn("all profiles experiences skills[0]", users[0].skills[0]);
  // console.warn(
  //   "all profiles experiences skills[0] translations",
  //   users[0].skills[0].skill.translations
  // );

  // console.warn("all profiles experiences skills[1]", users[0].skills[1]);
  // console.warn(
  //   "all profiles experiences skills[1] translations",
  //   users[0].skills[1].skill.translations
  // );

  // console.warn(
  //   "all profiles experiences competencies[0]",
  //   users[0].competencies[0]
  // );
  // console.warn(
  //   "all profiles experiences competencies[0] translations",
  //   users[0].competencies[0].competency.translations
  // );

  // console.warn(
  //   "all profiles experiences competencies[1]",
  //   users[0].competencies[1]
  // );
  // console.warn(
  //   "all profiles experiences competencies[1] translations",
  //   users[0].competencies[1].competency.translations
  // );

  // console.warn(
  //   "all profiles experiences mentorship[0]",
  //   users[0].mentorshipSkills[0]
  // );

  // console.warn(
  //   "all profiles experiences mentorship[1]",
  //   users[0].mentorshipSkills[1]
  // );

  // console.warn("all profiles organization[0]", users[0].organizations[0]);
  // console.warn(
  //   "all profiles organization[0].organizationTier",
  //   users[0].organizations[0].organizationTier
  // );
  // console.warn(
  //   "all profiles organization[0].organizationTier[0].translations",
  //   users[0].organizations[0].organizationTier[0].translations
  // );
  // console.warn(
  //   "all profiles organization[0].organizationTier[1].translations",
  //   users[0].organizations[0].organizationTier[1].translations
  // );

  const cleanedUsers = users.map((user) => {
    let allSkills = [];
    const info = {
      ...user,
      nameInitials: `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`,
    };

    if (info.employmentInfo) {
      const employment = info.employmentInfo.translations[0];
      info.branch = {};
      info.branch.name = employment ? employment.branch : undefined;
      info.branch.acronym = employment
        ? employment.branch
            .split(" ")
            .map((word) => word[0])
            .join("")
        : undefined;
      info.jobTitle = employment ? employment.jobTitle : undefined;
      delete info.employmentInfo;
    }

    if (info.officeLocation) {
      const location = info.officeLocation.translations[0];
      info.officeLocation.province = location ? location.province : undefined;
      info.officeLocation.streetName = location
        ? location.streetName
        : undefined;
      info.officeLocation.fullName = `${info.officeLocation.streetNumber} ${info.officeLocation.streetName}`;
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
          projects: i.projects,
        };
      });
    }

    if (info.qualifiedPools) {
      info.qualifiedPools = info.qualifiedPools.map((i) => {
        return {
          jobTitle: i.jobTitle,
          selectionProcessNumber: i.selectionProcessNumber,
          jobPosterLink: i.jobPosterLink,
          classification: i.classification ? i.classification.name : undefined,
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

    if (info.organizations) {
      info.organizations = _.flattenDeep(
        info.organizations.map((i) => {
          return i.organizationTier.map((organization) => {
            return {
              description: organization.translations[0]
                ? organization.translations[0].description
                : undefined,
            };
          });
        })
      );
    }

    if (info.tenure) {
      info.tenure = info.tenure.translations[0]
        ? info.tenure.translations[0].name
        : undefined;
    }

    return { ...info, skills: allSkills };
  });

  return cleanedUsers;
}

module.exports = getAllUsers;
