const request = require("supertest");
const { mockKeycloak, mockPrisma, unMock } = require("../../mocks");

beforeAll(() => {
  unMock();
});

describe.only("Test /api/stats/topFiveDevelopmentalGoals", () => {
  describe("when not authenticated", () => {
    test("should not process request - 403", async (done) => {
      app = require("../../../src/server");

      const response = await request(app).get(
        "/api/stats/topFiveDevelopmentalGoals"
      );

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
        "/api/stats/topFiveDevelopmentalGoals?language=ENGLISH"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual([
        { name: "Leading Teams", count: 1 },
        { name: "Change Management", count: 1 },
        { name: "Business Planning", count: 1 },
        { name: "Java", count: 1 },
        { name: "JavaScript", count: 1 },
      ]);

      done();
    });

    test("should process request in French - 200", async (done) => {
      app = require("../../../src/server");

      const response = await request(app).get(
        "/api/stats/topFiveDevelopmentalGoals?language=FRENCH"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual([
        { name: "Direction des équipes", count: 1 },
        { name: "Gestion du changement", count: 1 },
        { name: "Planification des activités", count: 1 },
        { name: "Java", count: 1 },
        { name: "JavaScript", count: 1 },
      ]);

      done();
    });

    test("should throw validation error without language query param - 422", async (done) => {
      console.log = jest.fn();
      app = require("../../../src/server");

      const response = await request(app).get(
        "/api/stats/topFiveDevelopmentalGoals"
      );

      expect(response.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      done();
    });

    test("should throw validation error invalid language query param - 422", async (done) => {
      console.log = jest.fn();
      app = require("../../../src/server");

      const response = await request(app).get(
        "/api/stats/topFiveDevelopmentalGoals?language=amsldfkm"
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
        "/api/stats/topFiveDevelopmentalGoals?language=ENGLISH"
      );

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe(
        "Error getting the top five developmental goals"
      );
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
