const request = require("supertest");
const _ = require("lodash");
const seed = require("../../../src/database/seeds/20200610114410-init-options/data/competencies");

const path = "/api/option/competencies";
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

        test("should have the competency id - 200", async (done) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.every((i) => "id" in i)).toBeTruthy();

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
          expect(res.text).toBe("Error fetching competency options");
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
          `${path}?language=fr`
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
      describe("when 'ids' array is empty", () => {
        test.todo("should process request - 200");
        test.todo("not delete anything from the database");
      });

      describe("when 'ids' array has multiple UUID", () => {
        test.todo("should process request - 200");
        test.todo("delete related user compentencies");
        test.todo("delete related user developmental goals");
        test.todo("delete related competency option translations");
        test.todo("delete competency options");
      });

      describe("when 'ids' array has a single UUID", () => {
        test.todo("should process request - 200");
        test.todo("delete related user compentencies");
        test.todo("delete related user developmental goals");
        test.todo("delete related competency option translations");
        test.todo("delete competency option");
      });

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
