const request = require("supertest");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/locations";

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
            province: "Quebec",
            streetName: "z",
            opOfficeLocation: {
              id: 2,
              streetNumber: 34,
              city: "Gatineau",
            },
          },
          {
            province: "Ontario",
            streetName: "b",
            opOfficeLocation: {
              id: 1,
              streetNumber: 12,
              city: "Ottawa",
            },
          },
          {
            province: "Ontario",
            streetName: "c",
            opOfficeLocation: {
              id: 3,
              streetNumber: 12,
              city: "Toroto",
            },
          },
          {
            province: "Ontario",
            streetName: "a",
            opOfficeLocation: {
              id: 4,
              streetNumber: 1,
              city: "Ottawa",
            },
          },
          {
            province: "Quebec",
            streetName: "a",
            opOfficeLocation: {
              id: 5,
              streetNumber: 34,
              city: "Gatineau",
            },
          },
        ],
        [
          {
            id: 4,
            streetNumber: 1,
            streetName: "a",
            city: "Ottawa",
            province: "Ontario",
          },
          {
            id: 1,
            streetNumber: 12,
            streetName: "b",
            city: "Ottawa",
            province: "Ontario",
          },
          {
            id: 3,
            streetNumber: 12,
            streetName: "c",
            city: "Toroto",
            province: "Ontario",
          },
          {
            id: 5,
            streetNumber: 34,
            streetName: "a",
            city: "Gatineau",
            province: "Quebec",
          },
          {
            id: 2,
            streetNumber: 34,
            streetName: "z",
            city: "Gatineau",
            province: "Quebec",
          },
        ],
      ],
      [
        "FRENCH",
        [
          {
            province: "Quebec",
            streetName: "a",
            opOfficeLocation: {
              id: 1,
              streetNumber: 34,
              city: "Gatineau",
            },
          },
        ],
        [
          {
            id: 1,
            streetNumber: 34,
            streetName: "a",
            city: "Gatineau",
            province: "Quebec",
          },
        ],
      ],
    ];

    describe.each(data)("in %s", (language, prismaData, result) => {
      let res;

      beforeAll(async () => {
        prisma.opTransOfficeLocation.findMany.mockResolvedValue(prismaData);

        res = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());
      });

      afterAll(() => {
        prisma.opTransOfficeLocation.findMany.mockReset();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opTransOfficeLocation.findMany).toHaveBeenCalledWith({
          where: {
            language,
          },
          select: {
            streetName: true,
            province: true,
            opOfficeLocation: {
              select: {
                id: true,
                streetNumber: true,
                city: true,
              },
            },
          },
          orderBy: {
            province: "asc",
          },
        });
      });

      test("should return expected result", () => {
        expect(res.body).toStrictEqual(result);
      });

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.opTransOfficeLocation.findMany.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opTransOfficeLocation.findMany).toHaveBeenCalled();

        prisma.opTransOfficeLocation.findMany.mockReset();
      });
    });

    test("should throw validation error without language query param - 422", async () => {
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransOfficeLocation.findMany).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=asdfafse`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransOfficeLocation.findMany).not.toHaveBeenCalled();
    });
  });
});
