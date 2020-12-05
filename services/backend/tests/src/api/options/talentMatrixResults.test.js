const request = require("supertest");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/talentMatrixResults";

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
            opTalentMatrixResultId: 1,
            description: "z",
          },
          {
            opTalentMatrixResultId: 2,
            description: "B",
          },
        ],
        [
          {
            id: 2,
            description: "B",
          },
          {
            id: 1,
            description: "z",
          },
        ],
      ],
      [
        "FRENCH",
        [
          {
            opTalentMatrixResultId: 3,
            description: "b",
          },
        ],
        [
          {
            id: 3,
            description: "b",
          },
        ],
      ],
    ];

    describe.each(data)("in %s", (language, prismaData, result) => {
      let res;

      beforeAll(async () => {
        prisma.opTransTalentMatrixResult.findMany.mockResolvedValue(prismaData);

        res = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());
      });

      afterAll(() => {
        prisma.opTransTalentMatrixResult.findMany.mockClear();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opTransTalentMatrixResult.findMany).toHaveBeenCalledWith({
          where: {
            language,
          },
          select: {
            opTalentMatrixResultId: true,
            description: true,
          },
          orderBy: {
            description: "asc",
          },
        });
      });

      test("should return expected result", () => {
        expect(res.body).toStrictEqual(result);
      });

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.opTransTalentMatrixResult.findMany.mockRejectedValue(
          new Error()
        );

        const dbRes = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opTransTalentMatrixResult.findMany).toHaveBeenCalled();

        prisma.opTransTalentMatrixResult.findMany.mockClear();
      });
    });

    test("should throw validation error without language query param - 422", async () => {
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransTalentMatrixResult.findMany).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=asdfafse`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransTalentMatrixResult.findMany).not.toHaveBeenCalled();
    });
  });
});
