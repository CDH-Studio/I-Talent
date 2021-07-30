const request = require("supertest");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/branches";

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
            branch: "Chief Information Office",
          },
          {
            branch: "Human Resources Branch",
          },
          {
            branch: "Human Resources Branch",
          },
          {
            branch: "Z Data",
          },
        ],
        [
          {
            value: "Chief Information Office",
            label: "Chief Information Office",
          },
          {
            value: "Human Resources Branch",
            label: "Human Resources Branch",
          },
          {
            value: "Z Data",
            label: "Z Data",
          },
        ],
      ],
      [
        "FRENCH",
        [
          { branch: "Bureau principal de l'information" },
          { branch: "Direction générale des ressources humaines" },
          { branch: "Direction générale des ressources humaines" },
          { branch: "Y Data" },
        ],
        [
          {
            value: "Bureau principal de l'information",
            label: "Bureau principal de l'information",
          },
          {
            value: "Direction générale des ressources humaines",
            label: "Direction générale des ressources humaines",
          },
          {
            value: "Y Data",
            label: "Y Data",
          },
        ],
      ],
    ];

    describe.each(data)("in %s", (language, prismaData, result) => {
      let res;

      beforeAll(async () => {
        prisma.transEmploymentInfo.findMany.mockResolvedValue(prismaData);

        res = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());
      });

      afterAll(() => {
        prisma.transEmploymentInfo.findMany.mockReset();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.transEmploymentInfo.findMany).toHaveBeenCalledWith({
          where: {
            language,
          },
          select: {
            branch: true,
          },
          orderBy: {
            branch: "asc",
          },
        });
      });

      test("should return expected result", () => {
        expect(res.body).toStrictEqual(result);
      });

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.transEmploymentInfo.findMany.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
      });
    });

    test("should throw validation error without language query param - 422", async () => {
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=ijoij`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });
  });
});
