const request = require("supertest");
const faker = require("faker");
const { getBearerToken, userId, isKeycloakUserSpy } = require("../../../mocks");
// const keycloakUtils = require("../../../../src/utils/keycloak");

const path = "/api/profile/private";

describe(`GET ${path}/:id`, () => {
  beforeEach(() => console.log.mockReset());

  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).get(`${path}/${faker.random.uuid()}`);

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

      prisma.user.findOne.mockResolvedValue(prismaData);

      isKeycloakUserSpy.mockImplementationOnce(() => true);

      const res = await request(app)
        .get(`${path}/${faker.random.uuid()}?language=ENGLISH`)
        .set("Authorization", getBearerToken());

      expect(res.status).toBe(200);
      expect(console.log).not.toHaveBeenCalled();
    });

    test("should throw validation error without language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}/${faker.random.uuid()}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}/${faker.random.uuid()}?language=ijoij`)
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
