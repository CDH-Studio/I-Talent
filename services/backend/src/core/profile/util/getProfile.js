const prisma = require("../../../database");

/**
 * Returns user information from the database
 *
 * @param {string} id Id of the user
 * @param {"ENGLISH" | "FRENCH"} language Language to fetch the profile information
 */
async function getFullProfile(id, language) {
  return prisma.user.findOne({
    where: { id },
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
          updatedAt: true,
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
          updatedAt: true,
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
      description: true,
      developmentalGoals: {
        select: {
          id: true,
          updatedAt: true,
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
          updatedAt: true,
          startDate: true,
          endDate: true,
          description: true,
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
          attachmentLinks: {
            select: {
              id: true,
              translations: {
                select: {
                  url: true,
                  name: {
                    select: {
                      translations: true,
                    },
                  },
                  nameId: true,
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
          updatedAt: true,
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
          attachmentLinks: {
            select: {
              id: true,
              translations: {
                select: {
                  url: true,
                  name: {
                    select: {
                      translations: true,
                    },
                  },
                  nameId: true,
                  language: true,
                },
              },
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
          updatedAt: true,
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
          description: true,
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
}

module.exports = getFullProfile;
