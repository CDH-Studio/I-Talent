const request = require("supertest");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/securityClearances";

describe(`GET ${path}`, () => {
  beforeEach(() => console.log.mockReset());

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
            opSecurityClearanceId: 1,
            description: "z",
          },
          {
            opSecurityClearanceId: 2,
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
            opSecurityClearanceId: 3,
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
        prisma.opTransSecurityClearance.findMany.mockResolvedValue(prismaData);

        res = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());
      });

      afterAll(() => {
        prisma.opTransSecurityClearance.findMany.mockReset();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opTransSecurityClearance.findMany).toHaveBeenCalledWith({
          where: {
            language,
          },
          select: {
            opSecurityClearanceId: true,
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
        prisma.opTransSecurityClearance.findMany.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opTransSecurityClearance.findMany).toHaveBeenCalled();

        prisma.opTransSecurityClearance.findMany.mockReset();
      });
    });

    test("should throw validation error without language query param - 422", async () => {
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransSecurityClearance.findMany).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=asdfafse`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransSecurityClearance.findMany).not.toHaveBeenCalled();
    });
  });
});
