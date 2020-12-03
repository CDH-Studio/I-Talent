const request = require("supertest");
const _ = require("lodash");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/branches";

describe(`GET ${path}`, () => {
  beforeEach(() => console.log.mockClear());

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
    const data = [
      [
        "ENGLISH",
        [
          { branch: "Z Data" },
          { branch: "Human Resources Branch" },
          { branch: "Chief Information Office" },
          { branch: "Human Resources Branch" },
        ],
      ],
      [
        "FRENCH",
        [
          { branch: "Y Data" },
          { branch: "Direction générale des ressources humaines" },
          { branch: "Bureau principal de l'information" },
          { branch: "Direction générale des ressources humaines" },
        ],
      ],
    ];

    describe.each(data)("in %s", (language, prismaData) => {
      let res;

      beforeAll(async () => {
        prisma.transEmploymentInfo.findMany.mockResolvedValue(prismaData);

        res = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());
      });

      afterAll(() => {
        prisma.transEmploymentInfo.findMany.mockClear();
      });

      test("should process request - 200", async () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.transEmploymentInfo.findMany).toHaveBeenCalledWith({
          where: {
            language,
          },
          select: {
            id: true,
            branch: true,
          },
          orderBy: {
            branch: "asc",
          },
        });
      });

      test("should process request and not return duplicate branches", async () => {
        expect(res.body.length).toBe(new Set(res.body).size);
      });

      test("should process request and return alphabetically", async () => {
        expect(res.body).toStrictEqual(_.sortBy(res.body));
      });

      test("should trigger error if there's a database problem - 500", async (done) => {
        prisma.transEmploymentInfo.findMany.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();

        done();
      });
    });

    test("should throw validation error without language query param - 422", async (done) => {
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      done();
    });

    test("should throw validation error invalid language query param - 422", async (done) => {
      const res = await request(app)
        .get(`${path}?language=ijoij`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      done();
    });
  });
});
