const request = require("supertest");
const _ = require("lodash");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/classifications";

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
    const prismaData = [
      { id: 1, name: "b" },
      { id: 2, name: "a" },
    ];

    const result = [
      { id: 2, name: "a" },
      { id: 1, name: "b" },
    ];

    let res;

    beforeAll(async () => {
      prisma.opClassification.findMany.mockResolvedValue(prismaData);

      res = await request(app).get(path).set("Authorization", getBearerToken());
    });

    test("should process request - 200", () => {
      expect(res.statusCode).toBe(200);
      expect(console.log).not.toHaveBeenCalled();
    });

    test("should call prisma with specified params", () => {
      expect(prisma.opClassification.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
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
      prisma.opClassification.findMany.mockRejectedValue(new Error());

      const dbRes = await request(app)
        .get(path)
        .set("Authorization", getBearerToken());

      expect(dbRes.statusCode).toBe(500);
      expect(dbRes.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opClassification.findMany).toHaveBeenCalled();

      prisma.opClassification.findMany.mockClear();
    });
  });
});
