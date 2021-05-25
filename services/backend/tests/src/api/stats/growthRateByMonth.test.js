const request = require("supertest");
const moment = require("moment");
const faker = require("faker");
const MockDate = require("mockdate");
const { getBearerToken } = require("../../../mocks");

const path = "/api/stats/growthRateByMonth";

describe(`GET ${path}`, () => {
  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).get(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when not authorised", () => {
    test("should not process request when user has incorrect keycloak role - 403", async () => {
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken(["role"]));

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    const data = [
      [
        "when there's data in a single year",
        [
          {
            id: faker.datatype.uuid(),
            createdAt: moment("2020-04-10").toISOString(),
          },
          {
            id: faker.datatype.uuid(),
            createdAt: moment("2020-05-04").toISOString(),
          },
          {
            id: faker.datatype.uuid(),
            createdAt: moment("2020-05-10").toISOString(),
          },
        ],
        "2020-05-20",
        {
          currentMonthNewUserCount: 2,
          growthRate: {
            2020: {
              3: 1,
              4: 2,
            },
          },
          growthRateFromPreviousMonth: 100,
        },
      ],
      [
        "when there's data for the first month of a single year",
        [
          {
            id: faker.datatype.uuid(),
            createdAt: moment("2021-01-04").toISOString(),
          },
          {
            id: faker.datatype.uuid(),
            createdAt: moment("2021-01-10").toISOString(),
          },
        ],
        "2021-01-04",
        {
          currentMonthNewUserCount: 2,
          growthRate: {
            2021: { 0: 2 },
          },
          growthRateFromPreviousMonth: 200,
        },
      ],
      [
        "when there's data for multiple years",
        [
          {
            id: faker.datatype.uuid(),
            createdAt: moment("2020-11-05").toISOString(),
          },
          {
            id: faker.datatype.uuid(),
            createdAt: moment("2021-01-20").toISOString(),
          },
        ],
        "2021-01-04",
        {
          currentMonthNewUserCount: 1,
          growthRate: {
            2021: {
              0: 1,
            },
            2020: {
              11: 0,
              10: 1,
            },
          },
          growthRateFromPreviousMonth: 100,
        },
      ],
    ];

    describe.each(data)("%s", (_testLabel, prismaData, currentDate, result) => {
      let res;

      beforeAll(async () => {
        prisma.user.findMany.mockResolvedValue(prismaData);
        MockDate.set(currentDate);

        res = await request(app)
          .get(path)
          .set("Authorization", getBearerToken(["view-admin-console"]));
      });

      afterAll(() => {
        prisma.user.findMany.mockReset();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.user.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
      });

      test("should return expected result", () => {
        expect(res.body).toStrictEqual(result);
      });
    });

    test("should trigger error if there's a database problem - 500", async () => {
      prisma.user.findMany.mockRejectedValue(new Error());

      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken(["view-admin-console"]));

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.findMany).toHaveBeenCalled();

      prisma.user.findMany.mockReset();
      console.log.mockReset();
    });

    test("should trigger error if there's no user in the database - 500", async () => {
      prisma.user.findMany.mockResolvedValue([]);

      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken(["view-admin-console"]));

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.findMany).toHaveBeenCalled();

      prisma.user.findMany.mockReset();
      console.log.mockReset();
    });
  });
});
