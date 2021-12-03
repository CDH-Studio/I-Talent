const request = require("supertest");
const faker = require("faker");
const { getBearerToken, userId } = require("../../../mocks");
const prisma = require("../../../../src/database");

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
            level: "B",
          },
          {
            id: faker.datatype.uuid(),
            status: "VALID",
            proficiency: "WRITING",
            level: "X",
          },
          {
            id: faker.datatype.uuid(),
            status: "UNKNOWN",
            proficiency: "READING",
            level: "C",
          },
        ],
        skills: [
          faker.datatype.uuid(),
          faker.datatype.uuid(),
        ],
        competencies: [
          faker.datatype.uuid(),
          faker.datatype.uuid(),
        ],
        description: "string",
        developmentalGoals: [faker.datatype.uuid()],
        developmentalGoalsAttachments: [
          {
            id: faker.datatype.uuid(),
            url: "https://www.example.com",
            nameId: faker.datatype.uuid(),
          },
        ],
        qualifiedPools: [
          {
            classificationId: faker.datatype.uuid(),
            id: faker.datatype.uuid(),
            jobTitle: "Data Scientist",
            jobPosterLink: "https://www.example.com",
            selectionProcessNumber: "123",
          },
        ],
        educations: [
          {
            id: faker.datatype.uuid(),
            description: "string",
            diplomaId: faker.datatype.uuid(),
            endDate: null,
            ongoingDate: true,
            schoolId: faker.datatype.uuid(),
            startDate: "2020-11-30T20:47:22.278Z",
            attachmentLinks: [
              {
                id: faker.datatype.uuid(),
                nameId: faker.datatype.uuid(),
                url: "https://www.example.com",
              },
            ],
          },
        ],
        relocationLocations: [
          faker.datatype.uuid(),
          faker.datatype.uuid(),
        ],
        experiences: [
          {
            id: faker.datatype.uuid(),
            description: "string",
            endDate: "2021-11-30T20:47:22.278Z",
            jobTitle: "string",
            ongoingDate: true,
            organization: "string",
            startDate: "2020-11-30T20:47:22.278Z",
            projects: ["I-Talent"],
            attachmentLinks: [
              {
                id: faker.datatype.uuid(),
                nameId: faker.datatype.uuid(),
                url: "https://www.example.com",
              },
            ],
          },
        ],
        mentorshipSkills: [
          faker.datatype.uuid(),
          faker.datatype.uuid(),
        ],
        connections: [
          {
            id: faker.datatype.uuid(),
            firstName: "Mary",
            lastName: "Doe",
            email: "mary.doe@canada.ca",
          },
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
          employmentEquityGroup: false,
        },
        branch: {
          ENGLISH: "Chief Information Office",
          FRENCH: "Bureau principal de l'information",
        },
        jobTitle: {
          ENGLISH: "Data Scientist",
          FRENCH: "Scientifique des Données",
        },
        organizations: [
          {
            tier: 4,
            title: {
              ENGLISH: "string",
              FRENCH: "string",
            },
          },
          {
            tier: 3,
            title: {
              ENGLISH: "string",
              FRENCH: "string",
            },
          },
          {
            tier: 2,
            title: {
              ENGLISH: "string",
              FRENCH: "string",
            },
          },
          {
            tier: 1,
            title: {
              ENGLISH: "string",
              FRENCH: "string",
            },
          },
          {
            tier: 0,
            title: {
              ENGLISH: "string",
              FRENCH: "string",
            },
          },
        ],
      }

      let res;

      // Fake ids for resolving mock values
      const attachmentLinkTestId = faker.datatype.uuid();
      const organizationTestId = faker.datatype.uuid();

      beforeAll(async () => {
        // For signupStep
        prisma.user.findUnique.mockResolvedValue({ signupStep: 0 });

        // For developmentGoals
        prisma.opSkill.findMany.mockResolvedValue([{ id: body.developmentalGoals[0] }]);
        prisma.opCompetency.findMany.mockResolvedValue([ { id: body.developmentalGoals[0] }]);

        // For educations and experiences 
        prisma.attachmentLink.findMany.mockResolvedValue([{ id: attachmentLinkTestId }]);
        prisma.transAttachmentLink.findMany.mockResolvedValue([{ id: faker.datatype.uuid() }]);

        // For organizations
        prisma.organization.findMany.mockResolvedValue([{ id: organizationTestId }]);
        prisma.organizationTier.findMany.mockResolvedValue([{ id: faker.datatype.uuid() }]);

        res = await request(app)
          .put(`${path}/${userId}?language=ENGLISH`)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send(body);
      });

      afterAll(() => {
        prisma.user.findUnique.mockReset();
        prisma.opSkill.findMany.mockReset();
        prisma.opCompetency.findMany.mockReset();
        prisma.attachmentLink.findMany.mockReset();
        prisma.transAttachmentLink.findMany.mockReset();
        prisma.organization.findMany.mockReset();
        prisma.organizationTier.findMany.mockReset();
        prisma.user.update.mockReset();
      });

      test("should process request - 204", () => {
        expect(res.statusCode).toBe(204);
        expect(res.text).toStrictEqual("");
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.user.findUnique).toHaveBeenCalledWith({
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
          where: {
            id: body.id,
          },
        });

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
          select: {
            status: true,
          },
          where: {
            id: body.id,
          },
        });

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
          select: {
            signupStep: true,
          },
          where: {
            id: body.id,
          },
        });

        expect(prisma.opSkill.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
          },
          where: {
            id: {
              in: [
                body.developmentalGoals[0],
              ],
            },
          },
        });

        expect(prisma.opCompetency.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
          },
          where: {
            id: {
              in: [
                body.developmentalGoals[0],
              ],
            },
          },
        });

        expect(prisma.attachmentLink.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
          },
          where: {
            experienceId: body.experiences[0].id,
          },
        });

        expect(prisma.attachmentLink.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
          },
          where: {
            userId: body.id,
          },
        });

        expect(prisma.attachmentLink.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
          },
          where: {
            educationId: body.educations[0].id,
          },
        });

        expect(prisma.transAttachmentLink.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
          },
          where: {
            attachmentLinkId: attachmentLinkTestId,
          },
        });

        expect(prisma.transAttachmentLink.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
          },
          where: {
            attachmentLinkId: attachmentLinkTestId,
          },
        });

        expect(prisma.transAttachmentLink.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
          },
          where: {
            attachmentLinkId: attachmentLinkTestId,
          },
        });

        expect(prisma.organization.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
          },
          where: {
            userId: body.id,
          },
        });

        expect(prisma.organizationTier.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
          },
          where: {
            organizationId: {
              in: [
                organizationTestId,
              ],
            },
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
            developmentalGoals: {
              deleteMany: {
                competencyId: {
                  notIn: [
                    body.developmentalGoals[0]
                  ],
                },
                skillId: {
                  notIn: [
                    body.developmentalGoals[0]
                  ],
                },
              },
              upsert: [
                {
                  create: {
                    competency: {
                      connect: {
                        id: body.developmentalGoals[0],
                      },
                    },
                    skill: {
                      connect: {
                        id: body.developmentalGoals[0],
                      },
                    },
                  },
                  update: {},
                  where: {
                    userId_competencyId: {
                      competencyId: body.developmentalGoals[0],
                      userId: body.id,
                    },
                    userId_skillId: {
                      skillId: body.developmentalGoals[0],
                      userId: body.id,
                    },
                  },
                },
              ],
            },
            developmentalGoalsAttachments: {
              create: [
                {
                    translations: {
                    create: {
                      language: "ENGLISH",
                      name: {
                        connect: {
                          id: body.developmentalGoalsAttachments[0].nameId,
                        },
                      },
                      url: "https://www.example.com",
                    },
                  },
                },
              ],
            },
            educations: {
              create: [
                {
                  attachmentLinks: {
                    create: [
                      {
                        translations: {
                          create: {
                            language: "ENGLISH",
                            name: {
                              connect: {
                                id: body.educations[0].attachmentLinks[0].nameId,
                              },
                            },
                            url: "https://www.example.com",
                          },
                        },
                      },
                    ],
                  },
                  description: "string",
                  diploma: {
                    connect: {
                      id: body.educations[0].diplomaId,
                    },
                  },
                  endDate: null,
                  ongoingDate: true,
                  school: {
                    connect: {
                      id: body.educations[0].schoolId,
                    },
                  },
                  startDate: "2020-11-01T04:00:00.000Z",
                },
              ],
            },
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
            experiences: {
              create: [
                {
                  attachmentLinks: {
                    create: [
                      {
                        translations: {
                          create: {
                            language: "ENGLISH",
                            name: {
                              connect: {
                                id: body.experiences[0].attachmentLinks[0].nameId,
                              },
                            },
                            url: "https://www.example.com",
                          },
                        },
                      },
                    ],
                  },
                  endDate: "2021-11-01T04:00:00.000Z",
                  ongoingDate: true,
                  projects: {
                    set: [
                      "I-Talent",
                    ],
                  },
                  startDate: "2020-11-01T04:00:00.000Z",
                  translations: {
                    create: {
                      description: "string",
                      jobTitle: "string",
                      language: "ENGLISH",
                      organization: "string",
                    },
                  },
                },
              ],
            },
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
            organizations: {
              create: {
                organizationTier: {
                  create: [
                    {
                      tier: 4,
                      translations: {
                        create: [
                          {
                            description: "string",
                            language: "ENGLISH",
                          },
                          {
                            description: "string",
                            language: "FRENCH",
                          },
                        ],
                      },
                    },
                    {
                      tier: 3,
                      translations: {
                        create: [
                          {
                            description: "string",
                            language: "ENGLISH",
                          },
                          {
                            description: "string",
                            language: "FRENCH",
                          },
                        ],
                      },
                    },
                    {
                      tier: 2,
                      translations: {
                        create: [
                          {
                            description: "string",
                            language: "ENGLISH",
                          },
                          {
                            description: "string",
                            language: "FRENCH",
                          },
                        ],
                      },
                    },
                    {
                      tier: 1,
                      translations: {
                        create: [
                          {
                            description: "string",
                            language: "ENGLISH",
                          },
                          {
                            description: "string",
                            language: "FRENCH",
                          },
                        ],
                      },
                    },
                    {
                      tier: 0,
                      translations: {
                        create: [
                          {
                            description: "string",
                            language: "ENGLISH",
                          },
                          {
                            description: "string",
                            language: "FRENCH",
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
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
                  jobPosterLink: "https://www.example.com",
                  jobTitle: "Data Scientist",
                  selectionProcessNumber: "123",
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
            signupStep: 8,
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
          },
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
