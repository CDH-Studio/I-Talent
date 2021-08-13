const request = require("supertest");
const faker = require("faker");
const { getBearerToken, userId, isKeycloakUserSpy } = require("../../../mocks");

const path = "/api/profile/private";

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
        connections: [
          {
            id: "580a2ac5-f2b1-4439-8dc9-f55426885182",
            firstName: "Mary",
            lastName: "Doe",
            email: "mary.doe@canada.ca",
          },
          {
            id: "51de4c81-40d7-4f87-883b-e7e1c31137cb",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@canada.ca",
          },
        ],
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

      isKeycloakUserSpy.mockImplementationOnce(() => true);

      const res = await request(app)
        .get(`${path}/${faker.datatype.uuid()}?language=ENGLISH`)
        .set("Authorization", getBearerToken());

      expect(res.status).toBe(200);
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
        .get(`${path}/notauuid?language=FRENCH`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });
  });
});
