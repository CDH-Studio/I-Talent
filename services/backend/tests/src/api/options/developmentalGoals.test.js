const request = require("supertest");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/developmentalGoals";

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
            opCompetencyId: 1,
            name: "z",
          },
          {
            opCompetencyId: 2,
            name: "B",
          },
        ],
        [
          {
            name: "d",
            opSkill: {
              id: 3,
              categoryId: 4,
            },
          },
          {
            name: "t",
            opSkill: {
              id: 5,
              categoryId: 6,
            },
          },
        ],
        [
          {
            id: 2,
            name: "B",
          },
          {
            id: 3,
            name: "d",
            categoryId: 4,
          },
          {
            id: 5,
            name: "t",
            categoryId: 6,
          },
          {
            id: 1,
            name: "z",
          },
        ],
      ],
      [
        "FRENCH",
        [
          {
            opCompetencyId: 7,
            name: "b",
          },
        ],
        [
          {
            name: "a",
            opSkill: {
              id: 8,
              categoryId: 9,
            },
          },
        ],
        [
          {
            id: 8,
            name: "a",
            categoryId: 9,
          },
          {
            id: 7,
            name: "b",
          },
        ],
      ],
    ];

    describe.each(data)("in %s", (language, compData, skillData, result) => {
      let res;

      beforeAll(async () => {
        prisma.opTransCompetency.findMany.mockResolvedValue(compData);
        prisma.opTransSkill.findMany.mockResolvedValue(skillData);

        res = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());
      });

      afterAll(() => {
        prisma.opTransCompetency.findMany.mockClear();
        prisma.opTransSkill.findMany.mockClear();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opTransCompetency.findMany).toHaveBeenCalledWith({
          where: {
            language,
          },
          select: {
            opCompetencyId: true,
            name: true,
          },
          orderBy: {
            name: "asc",
          },
        });

        expect(prisma.opTransSkill.findMany).toHaveBeenCalledWith({
          where: {
            language,
          },
          select: {
            name: true,
            opSkill: {
              select: {
                id: true,
                categoryId: true,
              },
            },
          },
          orderBy: {
            name: "asc",
          },
        });
      });

      test("should return expected result", () => {
        expect(res.body).toStrictEqual(result);
      });

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.opTransCompetency.findMany.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opTransCompetency.findMany).toHaveBeenCalled();

        prisma.opTransCompetency.findMany.mockClear();
      });
    });

    test("should throw validation error without language query param - 422", async () => {
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransCompetency.findMany).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=asdfafse`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransCompetency.findMany).not.toHaveBeenCalled();
    });
  });
});
