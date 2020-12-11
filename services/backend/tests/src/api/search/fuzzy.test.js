const request = require("supertest");
const { getBearerToken } = require("../../../mocks");

const path = "/api/search/fuzzy";

describe(`GET ${path}`, () => {
  beforeEach(() => console.log.mockReset());

  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).get(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    describe("when doing a normal query", () => {
      test.todo("should process request - 200");
    });

    test("should throw validation error without language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?searchValue=abc`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=abc`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });

    test("should throw validation error without searchValue query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=FRENCH`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });

    test("should respond with object of search results - 200", async () => {
      const res = await request(app)
        .get(`${path}?searchValue=a&language=ENGLISH`)
        .set("Authorization", getBearerToken());
      console.error("res", res);
      expect(res.statusCode).toBe(200);
      expect(console.log).toHaveBeenCalled();
    });
  });
});
