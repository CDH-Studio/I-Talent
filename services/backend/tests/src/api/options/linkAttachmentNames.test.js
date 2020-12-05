const request = require("supertest");
const faker = require("faker");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/attachmentNames";

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
            id: 1,
            translations: [{ name: "z" }],
          },
          {
            id: 2,
            translations: [{ name: "B" }],
          },
        ],
        faker.random.arrayElement(["Edu", "Exp", "Dev"]),
        [
          {
            id: 2,
            name: "B",
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
            id: 3,
            translations: [{ name: "b" }],
          },
        ],
        faker.random.arrayElement(["Edu", "Exp", "Dev"]),
        [
          {
            id: 3,
            name: "b",
          },
        ],
      ],
    ];

    describe.each(data)("in %s", (language, prismaData, type, result) => {
      let res;

      beforeAll(async () => {
        prisma.opAttachmentLinkName.findMany.mockResolvedValue(prismaData);

        res = await request(app)
          .get(`${path}?language=${language}&type=${type}`)
          .set("Authorization", getBearerToken());
      });

      afterAll(() => {
        prisma.opAttachmentLinkName.findMany.mockClear();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opAttachmentLinkName.findMany).toHaveBeenCalledWith({
          where: {
            type,
          },
          select: {
            id: true,
            translations: {
              where: {
                language,
              },
              select: {
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
        prisma.opAttachmentLinkName.findMany.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .get(`${path}?language=${language}&type=${type}`)
          .set("Authorization", getBearerToken());

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opAttachmentLinkName.findMany).toHaveBeenCalled();

        prisma.opAttachmentLinkName.findMany.mockClear();
      });
    });

    test("should throw validation error without language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?type=Edu`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opAttachmentLinkName.findMany).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=asdfafse&type=Edu`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opAttachmentLinkName.findMany).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid type query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=ENGLISH&type=abcd`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opAttachmentLinkName.findMany).not.toHaveBeenCalled();
    });
  });
});
