const request = require("supertest");
const _ = require("lodash");
const seedSchools = require("../../../src/database/seeds/20200610114410-init-options/data/schools");

const seed = seedSchools.map(({ abbrCountry, abbrProvince, translations }) => {
  const data = {
    abbrProvince,
    abbrCountry,
  };

  if (translations.en) {
    data.en = translations.en.name;
  }

  if (translations.fr) {
    data.fr = translations.fr.name;
  }

  return data;
});

const path = "/api/option/schoolsAllLang";

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
        const data = { ...i };
        delete data.id;
        return data;
      });
    });

    test("should process request - 200", async (done) => {
      expect(res.statusCode).toBe(200);
      expect(resData).toStrictEqual(
        _.orderBy(seed, ["abbrCountry", "abbrProvince", "en", "fr"])
      );

      done();
    });

    test("should have the school id - 200", async (done) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.every((i) => "id" in i)).toBeTruthy();

      done();
    });

    test("should process request and return alphabetically - 200", async (done) => {
      expect(res.statusCode).toBe(200);
      expect(resData).toStrictEqual(
        _.orderBy(resData, ["abbrCountry", "abbrProvince", "en", "fr"])
      );

      done();
    });

    test("should trigger error if there's a database problem - 500", async (done) => {
      const res = await request(mockedPrismaApp).get(path);

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Error fetching school options in every language");
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
