const request = require("supertest");
const _ = require("lodash");
const faker = require("faker");

const createFakeUser = () => ({
  id: faker.random.uuid(),
  createdAt: faker.date.past().toISOString(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  status: faker.random.arrayElement(["ACTIVE", "INACTIVE", "HIDDEN"]),
  employmentInfo: { translations: [{ jobTitle: faker.name.jobTitle() }] },
  tenure: { translations: [{ name: faker.lorem.words(1) }] },
});

const path = "/api/admin/users";
const data = [
  ["ENGLISH", [createFakeUser(), createFakeUser(), createFakeUser()]],
  ["FRENCH", [createFakeUser(), createFakeUser(), createFakeUser()]],
];

describe(`Test ${path}`, () => {
  describe("when not authenticated", () => {
    test("should not process request - 403", async (done) => {
      const res = await request(app).get(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();

      done();
    });
  });

  describe("when authenticated", () => {
    describe.each(data)("in %s", (language, prismaData) => {
      describe("when doing a normal query", () => {
        let res;

        beforeAll(async () => {
          prisma.user.findMany.mockResolvedValue(prismaData);

          res = await request(mockedApp).get(`${path}?language=${language}`);
        });

        afterAll(() => {
          prisma.user.findMany.mockClear();
        });

        test("should process request, have a status 200", () => {
          expect(res.statusCode).toBe(200);
          expect(console.log).not.toHaveBeenCalled();
        });

        test("should call prisma with specified params", () => {
          expect(prisma.user.findMany).toHaveBeenCalledWith({
            select: {
              id: true,
              createdAt: true,
              firstName: true,
              lastName: true,
              status: true,
              employmentInfo: {
                select: {
                  translations: {
                    where: {
                      language: language,
                    },
                    select: {
                      jobTitle: true,
                    },
                  },
                },
              },
              tenure: {
                select: {
                  translations: {
                    where: {
                      language,
                    },
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              firstName: "asc",
            },
          });
        });

        test("should return expected sorted result", () => {
          const expected = prismaData.map((i) => {
            const info = {
              ...i,
              jobTitle: i.employmentInfo.translations[0].jobTitle,
              tenure: i.tenure.translations[0].name,
            };

            delete info.employmentInfo;

            return info;
          });

          expect(res.body).toStrictEqual(
            _.orderBy(expected, ["firstName", "lastName", "status"])
          );
        });
      });

      test("should trigger error if there's a database problem - 500", async (done) => {
        prisma.user.findMany.mockRejectedValue(new Error());
        const res = await request(mockedApp).get(
          `${path}?language=${language}`
        );

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe("Error getting information about the users");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.user.findMany).toHaveBeenCalled();

        prisma.user.findMany.mockClear();
        console.log.mockClear();

        done();
      });
    });

    test("should throw validation error without language query param - 422", async (done) => {
      const res = await request(mockedApp).get(path);

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.findMany).not.toHaveBeenCalled();

      console.log.mockClear();

      done();
    });

    test("should throw validation error invalid language query param - 422", async (done) => {
      const res = await request(mockedApp).get(`${path}?language=en`);

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.findMany).not.toHaveBeenCalled();

      console.log.mockClear();

      done();
    });
  });
});
