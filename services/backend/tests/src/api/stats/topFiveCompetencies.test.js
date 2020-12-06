const request = require("supertest");
const faker = require("faker");
const { getBearerToken } = require("../../../mocks");

const path = "/api/stats/topFiveCompetencies";

describe(`GET ${path}`, () => {
  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).get(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    describe("when doing a normal query", () => {
      const data = [
        [
          "ENGLISH",
          [
            { id: faker.random.uuid(), competencyId: 1 },
            { id: faker.random.uuid(), competencyId: 1 },
            { id: faker.random.uuid(), competencyId: 2 },
            { id: faker.random.uuid(), competencyId: 2 },
            { id: faker.random.uuid(), competencyId: 2 },
            { id: faker.random.uuid(), competencyId: 2 },
            { id: faker.random.uuid(), competencyId: 3 },
            { id: faker.random.uuid(), competencyId: 3 },
            { id: faker.random.uuid(), competencyId: 4 },
            { id: faker.random.uuid(), competencyId: 4 },
            { id: faker.random.uuid(), competencyId: 4 },
            { id: faker.random.uuid(), competencyId: 5 },
            { id: faker.random.uuid(), competencyId: 6 },
          ],
          [
            { opCompetencyId: 1, name: "z" },
            { opCompetencyId: 2, name: "b" },
            { opCompetencyId: 3, name: "a" },
            { opCompetencyId: 4, name: "c" },
            { opCompetencyId: 5, name: "d" },
          ],
          [
            { count: 4, name: "b" },
            { count: 3, name: "c" },
            { count: 2, name: "a" },
            { count: 2, name: "z" },
            { count: 1, name: "d" },
          ],
          [2, 4, 1, 3, 5],
        ],
        [
          "FRENCH",
          [
            { id: faker.random.uuid(), competencyId: 1 },
            { id: faker.random.uuid(), competencyId: 2 },
            { id: faker.random.uuid(), competencyId: 2 },
            { id: faker.random.uuid(), competencyId: 2 },
            { id: faker.random.uuid(), competencyId: 3 },
            { id: faker.random.uuid(), competencyId: 3 },
          ],
          [
            { opCompetencyId: 1, name: "a" },
            { opCompetencyId: 2, name: "b" },
            { opCompetencyId: 3, name: "c" },
          ],
          [
            { count: 3, name: "b" },
            { count: 2, name: "c" },
            { count: 1, name: "a" },
          ],
          [2, 3, 1],
        ],
      ];

      describe.each(data)(
        "in %s",
        (
          language,
          prismaCompetencyData,
          prismaOpCompetencyData,
          result,
          topFiveCompetencyIds
        ) => {
          let res;

          beforeAll(async () => {
            prisma.competency.findMany.mockResolvedValue(prismaCompetencyData);
            prisma.opTransCompetency.findMany.mockResolvedValue(
              prismaOpCompetencyData
            );

            res = await request(app)
              .get(`${path}?language=${language}`)
              .set("Authorization", getBearerToken());
          });

          afterAll(() => {
            prisma.competency.findMany.mockReset();
            prisma.opTransCompetency.findMany.mockReset();
          });

          test("should process request - 200", () => {
            expect(res.statusCode).toBe(200);
            expect(console.log).not.toHaveBeenCalled();
          });

          test("should call prisma with specified params", () => {
            expect(prisma.competency.findMany).toHaveBeenCalledWith({
              select: {
                id: true,
                competencyId: true,
              },
            });

            expect(prisma.opTransCompetency.findMany).toHaveBeenCalledWith({
              where: {
                opCompetencyId: {
                  in: topFiveCompetencyIds,
                },
                language,
              },
              select: {
                name: true,
                opCompetencyId: true,
              },
            });
          });

          test("should return expected result", () => {
            expect(res.body).toStrictEqual(result);
          });
        }
      );

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.competency.findMany.mockRejectedValue(new Error());

        const res = await request(app)
          .get(`${path}?language=ENGLISH`)
          .set("Authorization", getBearerToken());

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.competency.findMany).toHaveBeenCalled();

        prisma.competency.findMany.mockReset();
        console.log.mockReset();
      });
    });
  });

  test("should throw validation error without language query param - 422", async () => {
    const res = await request(app)
      .get(path)
      .set("Authorization", getBearerToken());

    expect(res.statusCode).toBe(422);
    expect(console.log).toHaveBeenCalled();

    console.log.mockReset();
  });

  test("should throw validation error invalid language query param - 422", async () => {
    const res = await request(app)
      .get(`${path}?language=asdasasf`)
      .set("Authorization", getBearerToken());

    expect(res.statusCode).toBe(422);
    expect(console.log).toHaveBeenCalled();

    console.log.mockReset();
  });
});
