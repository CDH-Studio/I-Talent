const request = require("supertest");
const _ = require("lodash");

const path = "/api/admin/users";
const data = [
  [
    "ENGLISH",
    [
      {
        firstName: "John",
        jobTitle: "Data Scientist",
        lastName: "Doe",
        status: "ACTIVE",
        tenure: "Indeterminate",
      },
      {
        firstName: "Mary",
        jobTitle: "Manager",
        lastName: "Doe",
        status: "ACTIVE",
        tenure: "Term",
      },
    ],
  ],
  [
    "FRENCH",
    [
      {
        firstName: "John",
        jobTitle: "Scientifique des données",
        lastName: "Doe",
        status: "ACTIVE",
        tenure: "Indéterminé",
      },
      {
        firstName: "Mary",
        jobTitle: "Scientifique des données",
        lastName: "Doe",
        status: "ACTIVE",
        tenure: "Période",
      },
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
      let resData;

      beforeAll(async () => {
        res = await request(mockedKeycloakApp).get(
          `${path}?language=${language}`
        );

        resData = res.body.map((i) => {
          const data = { ...i };
          delete data.id;
          delete data.createdAt;
          delete data.updatedAt;

          return data;
        });
      });

      test("should process request - 200", async (done) => {
        expect(res.statusCode).toBe(200);
        expect(resData).toStrictEqual(result);

        done();
      });

      test("should process request and have an id, createdAt, and updatedAt for every user - 200", async (done) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.every((i) => "id" in i)).toBeTruthy();
        expect(res.body.every((i) => "createdAt" in i)).toBeTruthy();
        expect(res.body.every((i) => "updatedAt" in i)).toBeTruthy();

        done();
      });

      test("should process request and not return duplicate user info - 200", async (done) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(new Set(res.body).size);

        done();
      });

      test("should process request and return alphabetically - 200", async (done) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(_.sortBy(res.body, "firstName"));

        done();
      });

      test("should trigger error if there's a database problem - 500", async (done) => {
        const res = await request(mockedPrismaApp).get(
          `${path}?language=${language}`
        );

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe("Error getting information about the users");
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
      const res = await request(mockedKeycloakApp).get(`${path}?language=en`);

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
