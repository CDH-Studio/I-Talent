const request = require("supertest");
const _ = require("lodash");
const seed = require("../../../src/database/seeds/20200610114410-init-options/data/competencies");

const path = "/api/option/competenciesAllLang";

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
    let resData;

    beforeAll(async () => {
      res = await request(mockedKeycloakApp).get(path);
      resData = res.body.map((i) => {
        return {
          en: i.en,
          fr: i.fr,
        };
      });
    });

    test("should process request - 200", async (done) => {
      expect(res.statusCode).toBe(200);
      expect(resData).toStrictEqual(_.orderBy(seed, ["en", "fr"]));

      done();
    });

    test("should have the competency id - 200", async (done) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.every((i) => "id" in i)).toBeTruthy();

      done();
    });

    test("should process request and return alphabetically - 200", async (done) => {
      expect(res.statusCode).toBe(200);
      expect(resData).toStrictEqual(_.orderBy(resData, ["en", "fr"]));

      done();
    });

    test("should trigger error if there's a database problem - 500", async (done) => {
      const res = await request(mockedPrismaApp).get(path);

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Error fetching competency options in every language");
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
