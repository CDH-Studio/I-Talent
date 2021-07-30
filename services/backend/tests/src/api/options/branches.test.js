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
            employmentInfo: {
              id: "f412610e-0427-4e45-85ad-9eadc983ca83",
            },
          },
          {
            branch: "Human Resources Branch",
            employmentInfo: {
              id: "2222222222222222222",
            },
          },
          {
            branch: "Human Resources Branch",
            employmentInfo: {
              id: "2222222222222222222",
            },
          },
          {
            branch: "Human Resources Branch",
            employmentInfo: {
              id: "5555555555555555555555555",
            },
          },
          {
            branch: "Z Data",
            employmentInfo: {
              id: "44444444444444444444444444",
            },
          },
        ],
        [
          {
            value: "f412610e-0427-4e45-85ad-9eadc983ca83",
            label: "Chief Information Office",
          },
          {
            value: "2222222222222222222",
            label: "Human Resources Branch",
          },
          {
            value: "44444444444444444444444444",
            label: "Z Data",
          },
        ],
      ],
      [
        "FRENCH",
        [
          {
            branch: "Bureau principal de l'information",
            employmentInfo: {
              id: "f412610e-0427-4e45-85ad-9eadc983ca83",
            },
          },
          {
            branch: "Direction générale des ressources humaines",
            employmentInfo: {
              id: "44444444444444444444444444",
            },
          },
          {
            branch: "Direction générale des ressources humaines",
            employmentInfo: {
              id: "44444444444444444444444444",
            },
          },
          {
            branch: "Direction générale des ressources humaines",
            employmentInfo: {
              id: "5555555555555555555555555",
            },
          },
          {
            branch: "Y Data",
            employmentInfo: {
              id: "1111111111111111111111111",
            },
          },
        ],
        [
          {
            value: "f412610e-0427-4e45-85ad-9eadc983ca83",
            label: "Bureau principal de l'information",
          },
          {
            value: "44444444444444444444444444",
            label: "Direction générale des ressources humaines",
          },
          {
            value: "1111111111111111111111111",
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
            employmentInfo: {
              select: {
                id: true,
              },
            },
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
