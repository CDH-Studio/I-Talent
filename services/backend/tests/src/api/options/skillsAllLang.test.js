const request = require("supertest");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/skillsAllLang";

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
          categoryId: 2,
          translations: [
            { language: "ENGLISH", name: "a" },
            { language: "FRENCH", name: "z" },
          ],
        },
        {
          id: 3,
          categoryId: 4,
          translations: [
            { language: "ENGLISH", name: "a" },
            { language: "FRENCH", name: "b" },
          ],
        },
        {
          id: 5,
          categoryId: 6,
          translations: [
            { language: "ENGLISH", name: "c" },
            { language: "FRENCH", name: "c" },
          ],
        },
      ];

      const result = [
        { id: 3, en: "a", fr: "b", categoryId: 4 },
        { id: 1, en: "a", fr: "z", categoryId: 2 },
        { id: 5, en: "c", fr: "c", categoryId: 6 },
      ];

      let res;

      beforeAll(async () => {
        prisma.opSkill.findMany.mockResolvedValue(prismaData);

        res = await request(app)
          .get(path)
          .set("Authorization", getBearerToken(["view-admin-console"]));
      });

      afterAll(() => {
        prisma.opSkill.findMany.mockClear();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opSkill.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
            categoryId: true,
            translations: {
              select: {
                language: true,
                name: true,
              },
            },
          },
        });
      });

      test("should return expected result", () => {
        expect(res.body).toStrictEqual(result);
      });

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.opSkill.findMany.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .get(path)
          .set("Authorization", getBearerToken(["view-admin-console"]));

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opSkill.findMany).toHaveBeenCalled();

        prisma.opSkill.findMany.mockClear();
      });
    });
  });
});
