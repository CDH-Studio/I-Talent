const request = require("supertest");

const path = "/api/admin/check";

describe(`Test ${path}`, () => {
  describe("when not authenticated", () => {
    test("should not process request - 403", async (done) => {
      const res = await request(app).get(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");

      done();
    });
  });

  describe("when authenticated should process request", () => {
    test.todo("and return true if user has admin privileges - 200");

    test.todo("and return false if user does not have admin privileges - 200");
  });
});
