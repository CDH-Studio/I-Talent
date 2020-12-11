const request = require("supertest");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/schoolsAllLang";

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
          abbrProvince: "b",
          abbrCountry: "z",
          translations: [
            { language: "ENGLISH", name: "c" },
            { language: "FRENCH", name: "c" },
          ],
        },
        {
          id: 2,
          abbrProvince: "b",
          abbrCountry: "z",
          translations: [
            { language: "ENGLISH", name: "a" },
            { language: "FRENCH", name: "c" },
          ],
        },
        {
          id: 3,
          abbrProvince: "b",
          abbrCountry: "z",
          translations: [
            { language: "ENGLISH", name: "a" },
            { language: "FRENCH", name: "a" },
          ],
        },
        {
          id: 4,
          abbrProvince: "a",
          abbrCountry: "z",
          translations: [{ language: "FRENCH", name: "a" }],
        },
        {
          id: 5,
          abbrProvince: "a",
          abbrCountry: "b",
          translations: [{ language: "ENGLISH", name: "a" }],
        },
      ];

      const result = [
        { id: 5, abbrProvince: "a", abbrCountry: "b", en: "a" },
        { id: 4, abbrProvince: "a", abbrCountry: "z", fr: "a" },
        { id: 3, abbrProvince: "b", abbrCountry: "z", en: "a", fr: "a" },
        { id: 2, abbrProvince: "b", abbrCountry: "z", en: "a", fr: "c" },
        { id: 1, abbrProvince: "b", abbrCountry: "z", en: "c", fr: "c" },
      ];

      let res;

      beforeAll(async () => {
        prisma.opSchool.findMany.mockResolvedValue(prismaData);

        res = await request(app)
          .get(path)
          .set("Authorization", getBearerToken(["view-admin-console"]));
      });

      afterAll(() => {
        prisma.opSchool.findMany.mockReset();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opSchool.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
            abbrProvince: true,
            abbrCountry: true,
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
        prisma.opSchool.findMany.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .get(path)
          .set("Authorization", getBearerToken(["view-admin-console"]));

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opSchool.findMany).toHaveBeenCalled();

        prisma.opSchool.findMany.mockReset();
      });
    });
  });
});
