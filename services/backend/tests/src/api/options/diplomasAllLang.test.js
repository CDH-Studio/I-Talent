const request = require("supertest");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/diplomasAllLang";

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
    describe("when doing a normal query", () => {
      const prismaData = [
        {
          id: 1,
          translations: [
            { language: "ENGLISH", description: "a" },
            { language: "FRENCH", description: "z" },
          ],
        },
        {
          id: 2,
          translations: [
            { language: "ENGLISH", description: "a" },
            { language: "FRENCH", description: "b" },
          ],
        },
        {
          id: 3,
          translations: [
            { language: "ENGLISH", description: "c" },
            { language: "FRENCH", description: "c" },
          ],
        },
      ];

      const result = [
        { id: 2, en: "a", fr: "b" },
        { id: 1, en: "a", fr: "z" },
        { id: 3, en: "c", fr: "c" },
      ];

      let res;

      beforeAll(async () => {
        prisma.opDiploma.findMany.mockResolvedValue(prismaData);

        res = await request(app)
          .get(path)
          .set("Authorization", getBearerToken(["view-admin-console"]));
      });

      afterAll(() => {
        prisma.opDiploma.findMany.mockReset();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opDiploma.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
            translations: {
              select: {
                language: true,
                description: true,
              },
            },
          },
        });
      });

      test("should return expected result", () => {
        expect(res.body).toStrictEqual(result);
      });

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.opDiploma.findMany.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .get(path)
          .set("Authorization", getBearerToken(["view-admin-console"]));

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opDiploma.findMany).toHaveBeenCalled();

        prisma.opDiploma.findMany.mockReset();
      });
    });
  });
});
