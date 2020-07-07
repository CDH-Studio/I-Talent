const request = require("supertest");

const path = "/api/stats/topFiveCompetencies";

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
        { name: "Achieve Results", count: 1 },
        { name: "Budget", count: 1 },
        { name: "Business Acumen", count: 1 },
        { name: "Delegation", count: 1 },
        { name: "Mobilize People", count: 1 },
      ]);

      done();
    });

    test("should process request in French - 200", async (done) => {
      const res = await request(mockedKeycloakApp).get(
        `${path}?language=FRENCH`
      );

      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual([
        { name: "Avoir le sens des affaires", count: 1 },
        { name: "Budget", count: 1 },
        { name: "Mobiliser les personnes", count: 1 },
        { name: "Obtenir des résultats", count: 1 },
        { name: "Savoir déléguer", count: 1 },
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
      const res = await request(mockedKeycloakApp).get(
        `${path}?language=amsldfkm`
      );

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      done();
    });

    test("should trigger error if there's a database problem - 500", async (done) => {
      const res = await request(mockedPrismaApp).get(
        `${path}?language=ENGLISH`
      );

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Error getting the top five competencies");
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
