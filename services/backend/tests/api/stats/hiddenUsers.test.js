const request = require("supertest");

const path = "/api/stats/hiddenUsers";

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
    test("should process request - 200", async (done) => {
      const res = await request(mockedKeycloakApp).get(path);

      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual([]);

      done();
    });

    test("should trigger error if there's a database problem - 500", async (done) => {
      const res = await request(mockedPrismaApp).get(path);

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Error fetching hidden users");
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
