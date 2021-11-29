const request = require("supertest");
const faker = require("faker");
const { getBearerToken, userId } = require("../../../mocks");

const path = "/api/profile";

describe(`GET ${path}/:id`, () => {
  beforeEach(() => console.log.mockReset());

  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).get(`${path}/${faker.datatype.uuid()}`);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    test("when doing a normal query", async () => {
      const prismaData = {
        id: userId,
        name: "John Doe",
        email: "email@example.com",
        status: "ACTIVE",
        avatarColor: "#0bdaa3",
        firstName: "John",
        lastName: "Doe",
        createdAt: "2020-11-03T21:18:38.793Z",
        updatedAt: "2020-12-03T21:18:38.793Z",
        signupStep: 8,
        preferredLanguage: "ENGLISH",
        nameInitials: "JD",
        connections: [],
        visibleCards: {
          info: "PUBLIC",
          talentManagement: "PRIVATE",
          officialLanguage: "PRIVATE",
          description: "PRIVATE",
          skills: "PRIVATE",
          competencies: "PRIVATE",
          developmentalGoals: "PUBLIC",
          qualifiedPools: "PRIVATE",
          education: "PUBLIC",
          experience: "PUBLIC",
          careerInterests: "PUBLIC",
          mentorshipSkills: "PUBLIC",
          exFeeder: "PUBLIC",
          employmentEquityGroup: "PRIVATE",
        },
      };

      prisma.user.findUnique.mockResolvedValue(prismaData);

      const res = await request(app)
        .get(`${path}/${faker.datatype.uuid()}?language=ENGLISH`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(200);
      expect(console.log).not.toHaveBeenCalled();
    });

    test("should throw validation error without language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}/${faker.datatype.uuid()}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}/${faker.datatype.uuid()}?language=ijoij`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });

    test("should throw validation error invalid UUID query - 422", async () => {
      const res = await request(app)
        .get(`${path}/notauuid?language=ENGLISH`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });
  });
});

describe(`PUT ${path}/:id`, () => {
  beforeEach(() => console.log.mockReset());

  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).put(`${path}/${faker.datatype.uuid()}`);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    describe("when doing a normal query", () => {
      const body = {
        id: userId,
        name: "John Doe",
        firstName: "John",
        lastName: "Doe",
        teams: ["CDH Studio"],
        avatarColor: "#da680b",
        email: "email@example.com",
        telephone: "613-555-1111",
        cellphone: "613-555-1111",
        manager: "Chahine El Chaar",
        firstLanguage: "ENGLISH",
        secondLanguage: "FRENCH",
        preferredLanguage: "ENGLISH",
        pri: "07162534",
        linkedin: "linkedinUrl",
        github: "githubUrl",
        gcconnex: "gcconnexUrl",
        exFeeder: true,
        interestedInRemote: true,
        status: "ACTIVE",
        signupStep: 8,
        employmentEquityGroups: ["MINORITY"],
        secondLangProfs: [
          {
            id: faker.datatype.uuid(),
            status: "EXPIRED",
            proficiency: "ORAL",
            level: "B"
          },
          {
            id: faker.datatype.uuid(),
            status: "VALID",
            proficiency: "WRITING",
            level: "X"
          },
          {
            id: faker.datatype.uuid(),
            status: "UNKNOWN",
            proficiency: "READING",
            level: "C"
          }
        ],
        skills: [
          faker.datatype.uuid(),
          faker.datatype.uuid()
        ],
        competencies: [
          faker.datatype.uuid(),
          faker.datatype.uuid()
        ],
        description: "string",
        developmentalGoalsAttachments: [
          {
            id: faker.datatype.uuid(),
            url: "https://www.example.com/",
            nameid: faker.datatype.uuid(),
          }
        ],
        qualifiedPools: [
          {
            classificationId: faker.datatype.uuid(),
            id: faker.datatype.uuid(),
            jobTitle: "Student, ISED"
          }
        ],
        educations: [],
        relocationLocations: [
          faker.datatype.uuid(),
          faker.datatype.uuid()
        ],
        experiences: [],
        groupLevel: {
          id: faker.datatype.uuid(),
          name: "AS 01"
        },
        actingLevel: {
          id: faker.datatype.uuid(),
          name: "AS 01"
        },
        securityClearance: {
          id: faker.datatype.uuid(),
          description: "Secret"
        },
        lookingJob: true,
        tenure: {
          id: faker.datatype.uuid(),
          description: "Data Scientist"
        },
        employmentInfo: {
          id: faker.datatype.uuid(),
          translations: [
            {
              jobTitle: "Data Scientist",
              branch: "Chief Information Office",
            }
          ]
        },
        officeLocation: {
          id: faker.datatype.uuid(),
          postalCode: "K1A 0H5",
          streetNumber: 235,
          city: "Ottawa",
          country: "Canada",
          streetName: "Queen St",
          province: "Ontario"
        },
        mentorshipSkills: [
          faker.datatype.uuid(),
          faker.datatype.uuid()
        ],
        connections: [
          {
            id: faker.datatype.uuid(),
            firstName: "Mary",
            lastName: "Doe",
            email: "mary.doe@canada.ca"
          }
        ],
        careerMobilityId: faker.datatype.uuid(),
        tenureId: faker.datatype.uuid(),
        lookingJobId: faker.datatype.uuid(),
        employmentInfoId: faker.datatype.uuid(),
        officeLocationId: faker.datatype.uuid(),
        securityClearanceId: faker.datatype.uuid(),
        talentMatrixResultId: faker.datatype.uuid(),
        groupLevelId: faker.datatype.uuid(),
        actingLevelId: faker.datatype.uuid(),
        visibleCards: {
          info: true,
          talentManagement: false,
          officialLanguage: false,
          skills: true,
          competencies: true,
          developmentalGoals: true,
          description: true,
          qualifiedPools: true,
          education: true,
          experience: true,
          careerInterests: false,
          mentorshipSkills: true,
          exFeeder: true,
          employmentEquityGroup: false
        },
        branch: {
          ENGLISH: "Chief Information Office",
          FRENCH: "Bureau principal de l'information"
        },
        jobTitle: {
          ENGLISH: "Data Scientist",
          FRENCH: "Scientifique des Données"
        }
      }

      let res;

      beforeAll(async () => {
        res = await request(app)
          .put(`${path}/${userId}?language=ENGLISH`)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send(body);
      });

      afterAll(() => {
        prisma.user.update.mockReset();
      });

      test("should process request - 204", () => {
        expect(res.statusCode).toBe(204);
        expect(res.text).toStrictEqual("");
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.attachmentLink.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
          },
          where: {
            userId: body.id,
          },
        });
        expect(prisma.qualifiedPool.deleteMany).toHaveBeenCalledWith({
          where: {
            userId: body.id,
          },
        });
        expect(prisma.user.update).toHaveBeenCalledWith({
          data: {
            actingLevel: {
              connect: {
                id: body.actingLevelId,
              },
            },
            avatarColor: "#da680b",
            careerMobility: {
              connect: {
                id: body.careerMobilityId,
              },
            },
            cellphone: "613-555-1111",
            competencies: {
              deleteMany: {
                competencyId: {
                  notIn: [
                    body.competencies[0],
                    body.competencies[1],
                  ],
                },
              },
              upsert: [
                {
                  create: {
                    competency: {
                      connect: {
                        id: body.competencies[0],
                      },
                    },
                  },
                  update: {},
                  where: {
                    userId_competencyId: {
                      competencyId: body.competencies[0],
                      userId: body.id,
                    },
                  },
                },
                {
                  create: {
                    competency: {
                      connect: {
                        id: body.competencies[1],
                      },
                    },
                  },
                  update: {},
                  where: {
                    userId_competencyId: {
                      competencyId: body.competencies[1],
                      userId: body.id,
                    },
                  },
                },
              ],
            },
            description: "string",
            developmentalGoals: undefined,
            developmentalGoalsAttachments: {
              create: [
                {
                    translations: {
                    create: {
                      language: "ENGLISH",
                      name: {
                        connect: {
                          id: undefined,
                        },
                      },
                      url: "https://www.example.com/",
                    },
                  },
                },
              ],
            },
            educations: undefined,
            employmentEquityGroups: {
              set: [
                "MINORITY",
              ],
            },
            employmentInfo: {
              upsert: {
                create: {
                  translations: {
                    create: [
                      {
                        branch: "Chief Information Office",
                        jobTitle: "Data Scientist",
                        language: "ENGLISH",
                      },
                      {
                        branch: "Bureau principal de l'information",
                        jobTitle: "Scientifique des Données",
                        language: "FRENCH",
                      },
                    ],
                  },
                },
                update: {
                  translations: {
                    updateMany: [
                      {
                        data: {
                          branch: "Chief Information Office",
                          jobTitle: "Data Scientist",
                        },
                        where: {
                          language: "ENGLISH",
                        },
                      },
                      {
                        data: {
                          branch: "Bureau principal de l'information",
                          jobTitle: "Scientifique des Données",
                        },
                        where: {
                          language: "FRENCH",
                        },
                      },
                    ],
                  },
                },
              },
            },
            exFeeder: true,
            experiences: undefined,
            firstLanguage: "ENGLISH",
            firstName: "John",
            gcconnex: "gcconnexUrl",
            github: "githubUrl",
            groupLevel: {
              connect: {
                id: body.groupLevelId,
              },
            },
            interestedInRemote: true,
            lastName: "Doe",
            linkedin: "linkedinUrl",
            lookingJob: undefined,
            manager: "Chahine El Chaar",
            mentorshipSkills: {
              deleteMany: {
                skillId: {
                  notIn: [
                    body.mentorshipSkills[0],
                    body.mentorshipSkills[1],
                  ],
                },
              },
              upsert: [
                {
                  create: {
                    skill: {
                      connect: {
                        id: body.mentorshipSkills[0],
                     },
                   },
                 },
                  update: {},
                  where: {
                    userId_skillId: {
                      skillId: body.mentorshipSkills[0],
                      userId: body.id,
                    },
                  },
                },
                {
                  create: {
                    skill: {
                      connect: {
                        id: body.mentorshipSkills[1],
                      },
                    },
                  },
                  update: {},
                  where: {
                    userId_skillId: {
                      skillId: body.mentorshipSkills[1],
                      userId: body.id,
                    },
                  },
                },
              ],
            },
            officeLocation: undefined,
            organizations: undefined,
            preferredLanguage: "ENGLISH",
            pri: "07162534",
            qualifiedPools: {
              create: [
                {
                  classification: {
                    connect: {
                      id: body.qualifiedPools[0].classificationId,
                    },
                  },
                  jobPosterLink: undefined,
                  jobTitle: "Student, ISED",
                  selectionProcessNumber: undefined,
                },
              ],
            },
            relocationLocations: {
              deleteMany: {
                relocationLocationId: {
                  notIn: [
                    body.relocationLocations[0],
                    body.relocationLocations[1],
                  ],
                },
              },
              upsert: [
                {
                  create: {
                    relocationLocation: {
                      connect: {
                        id: body.relocationLocations[0],
                      },
                    },
                  },
                  update: {},
                  where: {
                    userId_relocationLocationId: {
                      relocationLocationId: body.relocationLocations[0],
                      userId: body.id,
                    },
                  },
                },
                {
                  create: {
                    relocationLocation: {
                      connect: {
                        id: body.relocationLocations[1],
                      },
                    },
                  },
                  update: {},
                  where: {
                    userId_relocationLocationId: {
                      relocationLocationId: body.relocationLocations[1],
                      userId: body.id,
                    },
                  },
                },
              ],
            },
            secondLangProfs: {
              deleteMany: {
                proficiency: {
                  notIn: [
                    "ORAL",
                    "WRITING",
                    "READING",
                  ],
                },
              },
              upsert: [
                {
                  create: {
                    id: body.secondLangProfs[0].id,
                    level: "B",
                    proficiency: "ORAL",
                    status: "EXPIRED",
                  },
                  update: {
                    level: "B",
                    status: "EXPIRED",
                  },
                  where: {
                    userId_proficiency: {
                      proficiency: "ORAL",
                      userId: body.id,
                    },
                  },
                },
                {
                  create: {
                    id: body.secondLangProfs[1].id,
                    level: "X",
                    proficiency: "WRITING",
                    status: "VALID",
                  },
                  update: {
                    level: "X",
                    status: "VALID",
                  },
                  where: {
                    userId_proficiency: {
                      proficiency: "WRITING",
                      userId: body.id,
                    },
                  },
                },
                {
                  create: {
                    id: body.secondLangProfs[2].id,
                    level: "C",
                    proficiency: "READING",
                    status: "UNKNOWN",
                  },
                  update: {
                    level: "C",
                    status: "UNKNOWN",
                  },
                  where: {
                    userId_proficiency: {
                      proficiency: "READING",
                      userId: body.id,
                    },
                  },
                },
              ],
            },
            secondLanguage: "FRENCH",
            securityClearance: {
              connect: {
                id: body.securityClearanceId,
              },
            },
            signupStep: undefined,
            skills: {
              deleteMany: {
                skillId: {
                  notIn: [
                    body.skills[0],
                    body.skills[1],
                  ],
                },
              },
              upsert: [
                {
                  create: {
                    skill: {
                      connect: {
                        id: body.skills[0],
                      },
                    },
                  },
                  update: {},
                  where: {
                    userId_skillId: {
                      skillId: body.skills[0],
                      userId: body.id,
                    },
                  },
                },
                {
                  create: {
                    skill: {
                      connect: {
                        id: body.skills[1],
                      },
                    },
                  },
                  update: {},
                  where: {
                    userId_skillId: {
                      skillId: body.skills[1],
                      userId: body.id,
                    },
                  },
                },
              ],
            },
            status: "ACTIVE",
            talentMatrixResult: {
              connect: {
                id: body.talentMatrixResultId,
              },
            },
            teams: {
              set: [
                "CDH Studio",
              ],
            },
            telephone: "613-555-1111",
            tenure: {
              connect: {
                id: body.tenureId,
              },
            },
            visibleCards: {
              update: {
                careerInterests: false,
                competencies: true,
                description: true,
                developmentalGoals: true,
                education: true,
                employmentEquityGroup: false,
                exFeeder: true,
                experience: true,
                info: true,
                mentorshipSkills: true,
                officialLanguage: false,
                qualifiedPools: true,
                skills: true,
                talentManagement: false,
              },
            },
          },
          where: {
            id: body.id,
          }
        });
      });
    });

    test("should throw validation error without language query param - 422", async () => {
      const res = await request(app)
        .put(`${path}/${faker.datatype.uuid()}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .put(`${path}/${faker.datatype.uuid()}?language=ijoij`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });

    test("should throw validation error invalid UUID query - 422", async () => {
      const res = await request(app)
        .put(`${path}/notauuid?language=ENGLISH`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });
  });
});
