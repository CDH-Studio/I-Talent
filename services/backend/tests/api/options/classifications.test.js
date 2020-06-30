const request = require("supertest");
const _ = require("lodash");
const seed = require("../../../src/database/seeds/20200610114410-init-options/data/classifications");

const path = "/api/option/classifications";

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
    let res;

    beforeAll(async () => {
      res = await request(mockedKeycloakApp).get(path);
    });

    test("should process request - 200", async (done) => {
      expect(res.statusCode).toBe(200);
      expect(_.map(res.body, "name")).toStrictEqual(_.sortBy(seed));

      done();
    });

    test("should process request and data should have ids - 200", async (done) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.every((i) => "id" in i)).toBeTruthy();

      done();
    });

    test("should process request and not return duplicate classfications - 200", async (done) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(new Set(res.body).size);

      done();
    });

    test("should process request and return alphabetically - 200", async (done) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual(_.sortBy(res.body));

      done();
    });

    test("should trigger error if there's a database problem - 500", async (done) => {
      const res = await request(mockedPrismaApp).get(`${path}`);

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Error fetching classification options");
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
