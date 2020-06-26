const request = require("supertest");
const { mockKeycloak, mockPrisma, unMock } = require("../../../mocks");

beforeAll(() => {
  unMock();
});

describe("Test /api/stats/count/users", () => {
  describe("when not authenticated", () => {
    test("should not process request - 403", async (done) => {
      app = require("../../../../src/server");

      const response = await request(app).get("/api/stats/count/users");

      expect(response.text).toBe("Access denied");
      expect(response.statusCode).toBe(403);

      done();
    });
  });

  describe("when authenticated", () => {
    beforeEach(() => {
      mockKeycloak();
    });

    test("should process request - 200", async (done) => {
      app = require("../../../../src/server");

      const response = await request(app).get("/api/stats/count/users");

      expect(response.statusCode).toBe(200);
      expect(response.body).toBe(2);

      done();
    });

    test("should trigger error if there's a database problem - 500", async (done) => {
      mockPrisma();
      console.log = jest.fn();
      app = require("../../../../src/server");

      const response = await request(app).get("/api/stats/count/users");

      expect(response.statusCode).toBe(500);
      expect(response.text).toBe("Error getting user count");
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
