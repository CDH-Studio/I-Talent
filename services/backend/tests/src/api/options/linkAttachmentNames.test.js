const request = require("supertest");
const faker = require("faker");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/attachmentNames";

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
            opAttachmentLinkNameId: 2,
            name: "B",
          },
          {
            opAttachmentLinkNameId: 1,
            name: "z",
          },
        ],
        faker.random.arrayElement(["Edu", "Exp", "Dev"]),
        [
          {
            value: 2,
            label: "B",
          },
          {
            value: 1,
            label: "z",
          },
        ],
      ],
      [
        "FRENCH",
        [
          {
            opAttachmentLinkNameId: 3,
            name: "b",
          },
        ],
        faker.random.arrayElement(["Edu", "Exp", "Dev"]),
        [
          {
            value: 3,
            label: "b",
          },
        ],
      ],
    ];

    describe.each(data)("in %s", (language, prismaData, type, result) => {
      let res;

      beforeAll(async () => {
        prisma.opTransAttachmentLinkName.findMany.mockResolvedValue(prismaData);

        res = await request(app)
          .get(`${path}?language=${language}&type=${type}`)
          .set("Authorization", getBearerToken());
      });

      afterAll(() => {
        prisma.opTransAttachmentLinkName.findMany.mockReset();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opTransAttachmentLinkName.findMany).toHaveBeenCalledWith({
          where: {
            opAttachmentLinkName: {
              type,
            },
            language,
          },
          select: {
            name: true,
            opAttachmentLinkNameId: true,
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
        prisma.opTransAttachmentLinkName.findMany.mockRejectedValue(
          new Error()
        );

        const dbRes = await request(app)
          .get(`${path}?language=${language}&type=${type}`)
          .set("Authorization", getBearerToken());

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opTransAttachmentLinkName.findMany).toHaveBeenCalled();

        prisma.opTransAttachmentLinkName.findMany.mockReset();
      });
    });

    test("should throw validation error without language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?type=Edu`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransAttachmentLinkName.findMany).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=asdfafse&type=Edu`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransAttachmentLinkName.findMany).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid type query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=ENGLISH&type=abcd`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransAttachmentLinkName.findMany).not.toHaveBeenCalled();
    });
  });
});
