const request = require("supertest");
const _ = require("lodash");
const seed = require("../../../src/database/seeds/20200610114410-init-options/data/officeLocations");

const path = "/api/option/locations";
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
      let resData;

      beforeAll(async () => {
        res = await request(mockedKeycloakApp).get(
          `${path}?language=${language}`
        );
        
        resData = res.body.map((i) => {
          delete i.id;
          return i;
        });
      });

      test(`should process request - 200`, async (done) => {
        expect(res.statusCode).toBe(200);

        const seedData = _.orderBy(
          seed.map((i) => {
            const { city, streetNumber, translations } = i;
            const { streetName, province } =
              language === "ENGLISH" ? translations.en : translations.fr;

            return {
              streetNumber,
              streetName,
              city,
              province,
            };
          }),
          ["province", "city", "streetNumber", "streetName"]
        );

        expect(resData).toStrictEqual(seedData);

        done();
      });

      test("should process request and return alphabetically per province - 200", async (done) => {
        expect(res.statusCode).toBe(200);

        expect(resData).toStrictEqual(
          _.orderBy(resData, ["province", "city", "streetNumber", "streetName"])
        );

        done();
      });

      test("should trigger error if there's a database problem - 500", async (done) => {
        const res = await request(mockedPrismaApp).get(
          `${path}?language=${language}`
        );

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe("Error fetching location options");
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
        `${path}?language=asdvctr4hg`
      );

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
