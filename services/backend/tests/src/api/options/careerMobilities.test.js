const request = require("supertest");
const _ = require("lodash");
const faker = require("faker");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/careerMobilities";

describe(`GET ${path}`, () => {
  beforeEach(() => console.log.mockClear());

  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).get(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    const data = [
      [
        "ENGLISH",
        [
          {
            opCareerMobilityId: faker.random.uuid(),
            description: faker.lorem.sentence(),
          },
          {
            opCareerMobilityId: faker.random.uuid(),
            description: faker.lorem.sentence(),
          },
        ],
      ],
      [
        "FRENCH",
        [
          {
            opCareerMobilityId: faker.random.uuid(),
            description: faker.lorem.sentence(),
          },
        ],
      ],
    ];

    describe.each(data)("in %s", (language, prismaData) => {
      let res;
      let resData;

      beforeAll(async () => {
        prisma.opTransCareerMobility.findMany.mockResolvedValue(prismaData);

        res = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());

        resData = _.map(res.body, "description");
      });

      afterAll(() => {
        prisma.opTransCareerMobility.findMany.mockClear();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opTransCareerMobility.findMany).toHaveBeenCalledWith({
          where: {
            language,
          },
          select: {
            opCareerMobilityId: true,
            description: true,
          },
          orderBy: {
            description: "asc",
          },
        });
      });

      test(`should process request and data should have ids`, () => {
        expect(res.body.every((i) => "id" in i)).toBeTruthy();
      });

      test(`should process request and data should have descriptions`, () => {
        expect(res.body.every((i) => "description" in i)).toBeTruthy();
      });

      test("should process request and return alphabetically", () => {
        expect(resData).toStrictEqual(_.sortBy(resData));
      });

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.opTransCareerMobility.findMany.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opTransCareerMobility.findMany).toHaveBeenCalled();

        prisma.opTransCareerMobility.findMany.mockClear();
      });
    });

    test("should throw validation error without language query param - 422", async () => {
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransCareerMobility.findMany).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=asdfafse`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransCareerMobility.findMany).not.toHaveBeenCalled();
    });
  });
});
