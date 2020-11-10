const request = require("supertest");

const path = "/api/stats/topFiveDevelopmentalGoals";

describe(`Test ${path}`, () => {
  describe("when not authenticated", () => {
    test("should not process request - 403", async (done) => {
      const res = await request(app).get(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");

      done();
    });
  });

  describe("when authenticated", () => {
    test("should process request in English - 200", async (done) => {
      const res = await request(mockedKeycloakApp).get(
        `${path}?language=ENGLISH`
      );

      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual([
        { name: "Business Planning", count: 1 },
        { name: "Change Management", count: 1 },
        { name: "Java", count: 1 },
        { name: "JavaScript", count: 1 },
        { name: "Leading Teams", count: 1 },
      ]);

      done();
    });

    test("should process request in French - 200", async (done) => {
      const res = await request(mockedKeycloakApp).get(
        `${path}?language=FRENCH`
      );

      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual([
        { name: "Direction des équipes", count: 1 },
        { name: "Gestion du changement", count: 1 },
        { name: "Java", count: 1 },
        { name: "JavaScript", count: 1 },
        { name: "Planification des activités", count: 1 },
      ]);

      done();
    });

    test("should throw validation error without language query param - 422", async (done) => {
      const res = await request(mockedKeycloakApp).get(path);

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      done();
    });

    test("should throw validation error invalid language query param - 422", async (done) => {
      const res = await request(mockedKeycloakApp).get(`${path}?language=amsldfkm`);

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      done();
    });

    test("should trigger error if there's a database problem - 500", async (done) => {
      const res = await request(mockedPrismaApp).get(`${path}?language=ENGLISH`);

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Error getting the top five developmental goals");
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
