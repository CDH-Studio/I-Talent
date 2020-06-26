const request = require("supertest");
const { mockKeycloak, mockPrisma, unMock } = require("../../mocks");

beforeAll(() => {
  unMock();
});

describe.only("Test /api/stats/topFiveCompetencies", () => {
  describe("when not authenticated", () => {
    test("should not process request - 403", async (done) => {
      app = require("../../../src/server");

      const response = await request(app).get("/api/stats/topFiveCompetencies");

      expect(response.statusCode).toBe(403);
      expect(response.text).toBe("Access denied");

      done();
    });
  });

  describe("when authenticated", () => {
    beforeEach(() => {
      mockKeycloak();
    });

    test("should process request in English - 200", async (done) => {
      app = require("../../../src/server");

      const response = await request(app).get(
        "/api/stats/topFiveCompetencies?language=ENGLISH"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual([
        { name: "Mobilize People", count: 1 },
        { name: "Achieve Results", count: 1 },
        { name: "Budget", count: 1 },
        { name: "Business Acumen", count: 1 },
        { name: "Delegation", count: 1 },
      ]);

      done();
    });

    test("should process request in French - 200", async (done) => {
      app = require("../../../src/server");

      const response = await request(app).get(
        "/api/stats/topFiveCompetencies?language=FRENCH"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual([
        { name: "Mobiliser les personnes", count: 1 },
        { name: "Obtenir des résultats", count: 1 },
        { name: "Budget", count: 1 },
        { name: "Avoir le sens des affaires", count: 1 },
        { name: "Savoir déléguer", count: 1 },
      ]);

      done();
    });

    test("should throw validation error without language query param - 422", async (done) => {
      console.log = jest.fn();
      app = require("../../../src/server");

      const response = await request(app).get("/api/stats/topFiveCompetencies");

      expect(response.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      done();
    });

    test("should throw validation error invalid language query param - 422", async (done) => {
      console.log = jest.fn();
      app = require("../../../src/server");

      const response = await request(app).get(
        "/api/stats/topFiveCompetencies?language=amsldfkm"
      );

      expect(response.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      done();
    });

    test("should trigger error if there's a database problem - 500", async (done) => {
      mockPrisma();
      console.log = jest.fn();
      app = require("../../../src/server");

      const response = await request(app).get(
        "/api/stats/topFiveCompetencies?language=ENGLISH"
      );

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe("Error getting the top five competencies");
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
