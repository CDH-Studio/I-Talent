const request = require("supertest");
const _ = require("lodash");
const seed = require("../../../src/database/seeds/20200610114410-init-options/data/diplomas");

const path = "/api/option/diplomas";
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
          resData = _.map(res.body, "description");
        });

        test("should process request - 200", async (done) => {
          expect(res.statusCode).toBe(200);

          const seedData = _.without(
            seed.map((i) => (language === "ENGLISH" ? i.en : i.fr)),
            undefined
          );

          expect(resData).toStrictEqual(_.sortBy(seedData));

          done();
        });

        test("should have the diploma id - 200", async (done) => {
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
          expect(res.text).toBe("Error fetching diploma options");
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
          `${path}?language=asdmoivfe12`
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
        test.todo("should process request, have a 200 status");
        test.todo("not delete anything from the database");
      });

      describe("when 'ids' array has multiple UUID", () => {
        test.todo("should process request, have a 200 status");
        test.todo("delete related school option translations");
        test.todo("delete school options");
      });

      describe("when 'ids' array has a single UUID", () => {
        test.todo("should process request, have a 200 status");
        test.todo("delete related school option translations");
        test.todo("delete school option");
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
