const request = require("supertest");
const _ = require("lodash");

const path = "/api/option/branches";
const data = [
  ["ENGLISH", ["Chief Information Office", "Human Resources Branch"]],
  [
    "FRENCH",
    [
      "Bureau principal de l'information",
      "Direction générale des ressources humaines",
    ],
  ],
];

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
    describe.each(data)("in %s", (language, result) => {
      let res;

      beforeAll(async () => {
        res = await request(mockedKeycloakApp).get(
          `${path}?language=${language}`
        );
      });

      test(`should process request - 200`, async (done) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(result);

        done();
      });

      test("should process request and not return duplicate branches - 200", async (done) => {
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
        const res = await request(mockedPrismaApp).get(
          `${path}?language=${language}`
        );

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe("Error fetching branch options");
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
        `${path}?language=ijoij`
      );

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
