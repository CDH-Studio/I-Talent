const request = require("supertest");
const faker = require("faker");
const { getBearerToken } = require("../../../mocks");

const path = "/api/stats/topFiveDevelopmentalGoals";

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
            { id: faker.datatype.uuid(), skillId: 1 },
            { id: faker.datatype.uuid(), skillId: 1 },
            { id: faker.datatype.uuid(), skillId: 2 },
            { id: faker.datatype.uuid(), skillId: 2 },
            { id: faker.datatype.uuid(), skillId: 2 },
            { id: faker.datatype.uuid(), skillId: 3 },
          ],
          [
            { id: faker.datatype.uuid(), competencyId: 1 },
            { id: faker.datatype.uuid(), competencyId: 2 },
            { id: faker.datatype.uuid(), competencyId: 2 },
            { id: faker.datatype.uuid(), competencyId: 2 },
            { id: faker.datatype.uuid(), competencyId: 2 },
            { id: faker.datatype.uuid(), competencyId: 3 },
            { id: faker.datatype.uuid(), competencyId: 3 },
          ],
          [
            { opSkillId: 1, name: "z" },
            { opSkillId: 2, name: "b" },
            { opSkillId: 3, name: "a" },
          ],
          [
            { opCompetencyId: 1, name: "c" },
            { opCompetencyId: 2, name: "d" },
            { opCompetencyId: 3, name: "e" },
          ],
          [
            { count: 4, name: "d" },
            { count: 3, name: "b" },
            { count: 2, name: "e" },
            { count: 2, name: "z" },
            { count: 1, name: "a" },
          ],
          [2, 1, 3],
          [2, 3, 1],
        ],
        [
          "FRENCH",
          [
            { id: faker.datatype.uuid(), skillId: 1 },
            { id: faker.datatype.uuid(), skillId: 2 },
            { id: faker.datatype.uuid(), skillId: 2 },
            { id: faker.datatype.uuid(), skillId: 2 },
            { id: faker.datatype.uuid(), skillId: 3 },
            { id: faker.datatype.uuid(), skillId: 3 },
          ],
          [],
          [
            { opSkillId: 1, name: "a" },
            { opSkillId: 2, name: "b" },
            { opSkillId: 3, name: "c" },
          ],
          [],
          [
            { count: 3, name: "b" },
            { count: 2, name: "c" },
            { count: 1, name: "a" },
          ],
          [2, 3, 1],
          [],
        ],
      ];

      describe.each(data)(
        "in %s",
        (
          language,
          prismaDevSkillData,
          prismaDevCompData,
          prismaOpSkillData,
          prismaOpCompetencyData,
          result,
          topFiveSkillIds,
          topFiveCompetencyIds
        ) => {
          let res;

          beforeAll(async () => {
            prisma.developmentalGoal.findMany
              .mockReturnValueOnce(prismaDevCompData)
              .mockReturnValueOnce(prismaDevSkillData);
            prisma.opTransSkill.findMany.mockResolvedValue(prismaOpSkillData);
            prisma.opTransCompetency.findMany.mockResolvedValue(
              prismaOpCompetencyData
            );

            res = await request(app)
              .get(`${path}?language=${language}`)
              .set("Authorization", getBearerToken());
          });

          afterAll(() => {
            prisma.developmentalGoal.findMany.mockReset();
            prisma.opTransSkill.findMany.mockReset();
            prisma.opTransCompetency.findMany.mockReset();
          });

          test("should process request - 200", () => {
            expect(res.statusCode).toBe(200);
            expect(console.log).not.toHaveBeenCalled();
          });

          test("should call prisma with specified params", () => {
            expect(prisma.developmentalGoal.findMany).toHaveBeenCalledWith({
              where: {
                skillId: null,
              },
              select: {
                id: true,
                competencyId: true,
              },
            });

            expect(prisma.developmentalGoal.findMany).toHaveBeenCalledWith({
              where: {
                competencyId: null,
              },
              select: {
                id: true,
                skillId: true,
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

            expect(prisma.opTransSkill.findMany).toHaveBeenCalledWith({
              where: {
                opSkillId: {
                  in: topFiveSkillIds,
                },
                language,
              },
              select: {
                name: true,
                opSkillId: true,
              },
            });
          });

          test("should return expected result", () => {
            expect(res.body).toStrictEqual(result);
          });
        }
      );

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.developmentalGoal.findMany.mockRejectedValue(new Error());

        const res = await request(app)
          .get(`${path}?language=ENGLISH`)
          .set("Authorization", getBearerToken());

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.developmentalGoal.findMany).toHaveBeenCalled();

        prisma.developmentalGoal.findMany.mockReset();
        console.log.mockReset();
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
});
