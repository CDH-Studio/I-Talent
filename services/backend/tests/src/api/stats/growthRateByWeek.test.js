const request = require("supertest");
const moment = require("moment");
const faker = require("faker");
const { getBearerToken } = require("../../../mocks");

const path = "/api/stats/growthRateByWeek";

describe(`Test ${path}`, () => {
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
      ["when there are no users", [], {}],
      [
        "when there are users",
        [
          {
            id: faker.datatype.uuid(),
            createdAt: moment().subtract(3, "week"),
          },
          {
            id: faker.datatype.uuid(),
            createdAt: moment().subtract(1, "week"),
          },
          {
            id: faker.datatype.uuid(),
            createdAt: moment(),
          },
          {
            id: faker.datatype.uuid(),
            createdAt: moment(),
          },
        ],
        {
          0: 2,
          1: 1,
          3: 1,
        },
      ],
    ];

    describe.each(data)("%s", (_testLabel, prismaData, result) => {
      let res;

      beforeAll(async () => {
        prisma.user.findMany.mockResolvedValue(prismaData);

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
  });
});
