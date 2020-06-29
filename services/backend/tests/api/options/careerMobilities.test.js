const request = require("supertest");
const _ = require("lodash");

const seed = require("../../../src/database/seeds/20200610114410-init-options/data/careerMobilities");

const path = "/api/option/careerMobilities";
const data = ["ENGLISH", "FRENCH"];

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
    describe.each(data)("in %s", (language) => {
      let res;

      beforeAll(async () => {
        res = await request(mockedKeycloakApp).get(
          `${path}?language=${language}`
        );
      });

      test(`should process request - 200`, async (done) => {
        expect(res.statusCode).toBe(200);

        const seedData = seed.map((i) =>
          language === "ENGLISH" ? i.en : i.fr
        );

        const resData = res.body.map((i) => i.description);

        expect(resData).toStrictEqual(_.sortBy(seedData));

        done();
      });

      test("should process request and return alphabetically - 200", async (done) => {
        expect(res.statusCode).toBe(200);

        expect(
          _.isEqual(
            _.map(res.body, "description"),
            _.sortBy(_.map(res.body, "description"))
          )
        ).toBeTruthy();

        done();
      });

      test("should trigger error if there's a database problem - 500", async (done) => {
        const res = await request(mockedPrismaApp).get(
          `${path}?language=${language}`
        );

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe("Error fetching careerMobility options");
        expect(console.log).toHaveBeenCalled();

        done();
      });
    });

    test("should throw validation error without language query param - 422", async (done) => {
      const res = await request(mockedKeycloakApp).get(path);

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      done();
    });

    test("should throw validation error invalid language query param - 422", async (done) => {
      const res = await request(mockedKeycloakApp).get(
        `${path}?language=asdfafse`
      );

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
