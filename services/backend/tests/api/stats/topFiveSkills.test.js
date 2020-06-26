const request = require("supertest");
const { mockKeycloak, mockPrisma, unMock } = require("../../mocks");

beforeAll(() => {
  unMock();
});

describe.only("Test /api/stats/topFiveSkills", () => {
  describe("when not authenticated", () => {
    test("should not process request - 403", async (done) => {
      app = require("../../../src/server");

      const response = await request(app).get("/api/stats/topFiveSkills");

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
        "/api/stats/topFiveSkills?language=ENGLISH"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual([
        { name: 'Clerical', count: 1 },
        { name: 'Executive Support', count: 1 },
        { name: 'Financial Policy', count: 1 },
        { name: 'Statistics', count: 1 },
        { name: 'Teaching (Instructor)', count: 1 }
      ]);

      done();
    });

    test("should process request in French - 200", async (done) => {
      app = require("../../../src/server");

      const response = await request(app).get(
        "/api/stats/topFiveSkills?language=FRENCH"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual([
        { name: "Travail administratif", count: 1 },
        { name: "Soutien à la haute direction", count: 1 },
        { name: "Statistiques", count: 1 },
        { name: "Politique financière", count: 1 },
        { name: "Enseignement (instructeur)", count: 1 },
      ]);

      done();
    });

    test("should throw validation error without language query param - 422", async (done) => {
      console.log = jest.fn();
      app = require("../../../src/server");

      const response = await request(app).get("/api/stats/topFiveSkills");

      expect(response.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      done();
    });

    test("should throw validation error invalid language query param - 422", async (done) => {
      console.log = jest.fn();
      app = require("../../../src/server");

      const response = await request(app).get(
        "/api/stats/topFiveSkills?language=amsldfkm"
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
        "/api/stats/topFiveSkills?language=ENGLISH"
      );

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe("Error getting the top five skills");
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
