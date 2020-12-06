const request = require("supertest");
const faker = require("faker");
const { getBearerToken } = require("../../../mocks");

const path = "/api/stats/topFiveSkills";

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
    describe("when doing a normal query", () => {
      const data = [
        [
          "ENGLISH",
          [
            { id: faker.random.uuid(), skillId: 1 },
            { id: faker.random.uuid(), skillId: 1 },
            { id: faker.random.uuid(), skillId: 2 },
            { id: faker.random.uuid(), skillId: 2 },
            { id: faker.random.uuid(), skillId: 2 },
            { id: faker.random.uuid(), skillId: 2 },
            { id: faker.random.uuid(), skillId: 3 },
            { id: faker.random.uuid(), skillId: 3 },
            { id: faker.random.uuid(), skillId: 4 },
            { id: faker.random.uuid(), skillId: 4 },
            { id: faker.random.uuid(), skillId: 4 },
            { id: faker.random.uuid(), skillId: 5 },
            { id: faker.random.uuid(), skillId: 6 },
          ],
          [
            { opSkillId: 1, name: "z" },
            { opSkillId: 2, name: "b" },
            { opSkillId: 3, name: "a" },
            { opSkillId: 4, name: "c" },
            { opSkillId: 5, name: "d" },
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
            { id: faker.random.uuid(), skillId: 1 },
            { id: faker.random.uuid(), skillId: 2 },
            { id: faker.random.uuid(), skillId: 2 },
            { id: faker.random.uuid(), skillId: 2 },
            { id: faker.random.uuid(), skillId: 3 },
            { id: faker.random.uuid(), skillId: 3 },
          ],
          [
            { opSkillId: 1, name: "a" },
            { opSkillId: 2, name: "b" },
            { opSkillId: 3, name: "c" },
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
          prismaSkillData,
          prismaOpSkillData,
          result,
          topFiveSkillIds
        ) => {
          let res;

          beforeAll(async () => {
            prisma.skill.findMany.mockResolvedValue(prismaSkillData);
            prisma.opTransSkill.findMany.mockResolvedValue(prismaOpSkillData);

            res = await request(app)
              .get(`${path}?language=${language}`)
              .set("Authorization", getBearerToken());
          });

          afterAll(() => {
            prisma.skill.findMany.mockClear();
            prisma.opTransSkill.findMany.mockClear();
          });

          test("should process request - 200", () => {
            expect(res.statusCode).toBe(200);
            expect(console.log).not.toHaveBeenCalled();
          });

          test("should call prisma with specified params", () => {
            expect(prisma.skill.findMany).toHaveBeenCalledWith({
              select: {
                id: true,
                skillId: true,
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
        prisma.skill.findMany.mockRejectedValue(new Error());

        const res = await request(app)
          .get(`${path}?language=ENGLISH`)
          .set("Authorization", getBearerToken());

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.skill.findMany).toHaveBeenCalled();

        prisma.skill.findMany.mockClear();
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
        .get(`${path}?language=asdasasf`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });
  });
});
