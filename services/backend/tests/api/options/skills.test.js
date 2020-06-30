const request = require("supertest");
const _ = require("lodash");
const seedSkills = require("../../../src/database/seeds/20200610114410-init-options/data/skills");

const seed = _.flatten(_.map(seedSkills));

const path = "/api/option/skills";
const data = ["ENGLISH", "FRENCH"];

describe(`Test ${path}`, () => {
  describe("GET", () => {
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
          resData = _.map(res.body, "name");
        });

        test("should process request - 200", async (done) => {
          expect(res.statusCode).toBe(200);

          const seedData = seed.map((i) =>
            language === "ENGLISH" ? i.en : i.fr
          );

          expect(resData).toStrictEqual(_.sortBy(seedData));

          done();
        });

        test("should have the skill and category id - 200", async (done) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.every((i) => "id" in i)).toBeTruthy();
          expect(res.body.every((i) => "categoryId" in i)).toBeTruthy();

          done();
        });

        test("should process request and return alphabetically - 200", async (done) => {
          expect(res.statusCode).toBe(200);
          expect(resData).toStrictEqual(_.sortBy(resData));

          done();
        });

        test("should trigger error if there's a database problem - 500", async (done) => {
          const res = await request(mockedPrismaApp).get(
            `${path}?language=${language}`
          );

          expect(res.statusCode).toBe(500);
          expect(res.text).toBe("Error fetching skill options");
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

  describe("DELETE", () => {
    describe("when not authenticated", () => {
      test("should not process request without credentials - 403", async (done) => {
        const res = await request(app).delete(path);

        expect(res.statusCode).toBe(403);
        expect(res.text).toBe("Access denied");

        done();
      });

      test.todo(
        "should not process request without correct keycloak role - 403"
      );
    });

    describe("when authenticated", () => {
      test.todo("should process request if array is empty - 200");

      test.todo("should process request with multiple UUIDs - 200");

      test.todo("should process request with a single UUID - 200");

      test.todo(
        "should throw validation error if body doesn't contain 'ids' - 422"
      );

      test.todo("should throw validation error if 'ids' isn't an array - 422");

      test.todo(
        "should throw validation error if 'ids' doesn't contain UUID in the array - 422"
      );

      test.todo("should trigger error UUIDs are not in the database - 500");

      test.todo("should trigger error if there's a database problem - 500");
    });
  });
});
