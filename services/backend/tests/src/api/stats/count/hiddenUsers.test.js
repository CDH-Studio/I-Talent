const request = require("supertest");
const faker = require("faker");
const { getBearerToken } = require("../../../../mocks");

const path = "/api/stats/count/hiddenUsers";

describe(`GET ${path}`, () => {
  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).get(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when not authorised", () => {
    test("should not process request when user has incorrect keycloak role - 403", async () => {
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken(["role"]));

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    test("should process request - 200", async () => {
      const randomNumber = faker.random.number(1000);

      prisma.user.count.mockResolvedValue(randomNumber);
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken(["view-admin-console"]));

      expect(res.statusCode).toBe(200);
      expect(res.body).toBe(randomNumber);
      expect(console.log).not.toHaveBeenCalled();
      expect(prisma.user.count).toHaveBeenCalledWith({
        where: {
          status: "HIDDEN",
        },
      });

      prisma.user.count.mockClear();
    });

    test("should trigger error if there's a database problem - 500", async () => {
      prisma.user.count.mockRejectedValue(new Error());
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken(["view-admin-console"]));

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.count).toHaveBeenCalled();

      prisma.user.count.mockClear();
      console.log.mockClear();
    });
  });
});
