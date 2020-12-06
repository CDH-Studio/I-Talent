const request = require("supertest");
const faker = require("faker");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/skill";

describe(`POST ${path}`, () => {
  beforeEach(() => console.log.mockReset());

  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).post(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when not authorised", () => {
    test("should not process request when user has incorrect keycloak role - 403", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["role"]));

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    describe("when doing a normal query", () => {
      const body = {
        categoryId: faker.random.uuid(),
        en: faker.lorem.sentence(),
        fr: faker.lorem.sentence(),
      };

      let res;

      beforeAll(async () => {
        res = await request(app)
          .post(path)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send(body);
      });

      afterAll(() => {
        prisma.opSkill.create.mockReset();
      });

      test("should process request - 201", () => {
        expect(res.statusCode).toBe(201);
        expect(res.text).toStrictEqual("Created");
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opSkill.create).toHaveBeenCalledWith({
          data: {
            category: {
              connect: {
                id: body.categoryId,
              },
            },
            translations: {
              create: [
                {
                  name: body.en,
                  language: "ENGLISH",
                },
                {
                  name: body.fr,
                  language: "FRENCH",
                },
              ],
            },
          },
        });
      });

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.opSkill.create.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .post(path)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send(body);

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opSkill.create).toHaveBeenCalled();

        prisma.opSkill.create.mockReset();
      });
    });

    test("should throw validation error invalid en body value - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ categoryId: faker.random.uuid(), fr: "data", en: [] });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSkill.create).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid fr body value - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ categoryId: faker.random.uuid(), fr: [], en: "data" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSkill.create).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid categoryId body value - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ categoryId: "notAUUID", fr: "data", en: "data" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSkill.create).not.toHaveBeenCalled();
    });
  });
});

describe(`PUT ${path}`, () => {
  beforeEach(() => console.log.mockReset());

  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).put(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when not authorised", () => {
    test("should not process request when user has incorrect keycloak role - 403", async () => {
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["role"]));

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    describe("when doing a normal query", () => {
      const body = {
        id: faker.random.uuid(),
        categoryId: faker.random.uuid(),
        fr: "data",
        en: "data",
      };

      let res;

      beforeAll(async () => {
        res = await request(app)
          .put(path)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send(body);
      });

      afterAll(() => {
        prisma.opSkill.update.mockReset();
      });

      test("should process request - 204", () => {
        expect(res.statusCode).toBe(204);
        expect(res.text).toStrictEqual("");
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opSkill.update).toHaveBeenCalledWith({
          where: {
            id: body.id,
          },
          data: {
            category: {
              connect: {
                id: body.categoryId,
              },
            },
            translations: {
              updateMany: [
                {
                  where: {
                    language: "ENGLISH",
                  },
                  data: {
                    name: body.en,
                  },
                },
                {
                  where: {
                    language: "FRENCH",
                  },
                  data: {
                    name: body.fr,
                  },
                },
              ],
            },
          },
        });
      });
    });

    test("should throw validation error invalid id body value - 422", async () => {
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({
          id: "notauuid",
          categoryId: faker.random.uuid(),
          fr: "data",
          en: "data",
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSkill.update).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid en body value - 422", async () => {
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({
          id: faker.random.uuid(),
          categoryId: faker.random.uuid(),
          fr: "data",
          en: [],
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSkill.update).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid fr body value - 422", async () => {
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({
          id: faker.random.uuid(),
          categoryId: faker.random.uuid(),
          fr: [],
          en: "data",
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSkill.update).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid categoryId body value - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({
          id: faker.random.uuid(),
          categoryId: "notAUUID",
          fr: "data",
          en: "data",
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSkill.create).not.toHaveBeenCalled();
    });
  });
});

describe(`DELETE ${path}`, () => {
  beforeEach(() => console.log.mockReset());

  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).delete(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when not authorised", () => {
    test("should not process request when user has incorrect keycloak role - 403", async () => {
      const res = await request(app)
        .delete(path)
        .set("Authorization", getBearerToken(["role"]));

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    describe("when doing a normal query", () => {
      const id = faker.random.uuid();

      let res;

      beforeAll(async () => {
        prisma.skill.deleteMany.mockReturnValue(1);
        prisma.mentorshipSkill.deleteMany.mockReturnValue(2);
        prisma.developmentalGoal.deleteMany.mockReturnValue(3);
        prisma.opTransSkill.deleteMany.mockReturnValue(4);
        prisma.opSkill.delete.mockReturnValue(5);

        res = await request(app)
          .delete(path)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send({ id });
      });

      afterAll(() => {
        prisma.skill.deleteMany.mockReset();
        prisma.mentorshipSkill.deleteMany.mockReset();
        prisma.developmentalGoal.deleteMany.mockReset();
        prisma.opTransSkill.deleteMany.mockReset();
        prisma.opSkill.delete.mockReset();
        prisma.$transaction.mockReset();
      });

      test("should process request - 204", () => {
        expect(res.statusCode).toBe(204);
        expect(res.text).toStrictEqual("");
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.skill.deleteMany).toHaveBeenCalledWith({
          where: {
            skillId: id,
          },
        });

        expect(prisma.mentorshipSkill.deleteMany).toHaveBeenCalledWith({
          where: {
            skillId: id,
          },
        });

        expect(prisma.developmentalGoal.deleteMany).toHaveBeenCalledWith({
          where: {
            skillId: id,
          },
        });

        expect(prisma.opTransSkill.deleteMany).toHaveBeenCalledWith({
          where: {
            opSkillId: id,
          },
        });

        expect(prisma.opSkill.delete).toHaveBeenCalledWith({
          where: {
            id,
          },
        });

        expect(prisma.$transaction).toHaveBeenCalledWith([1, 2, 3, 4, 5]);
      });

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.$transaction.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .delete(path)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send({ id });

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.$transaction).toHaveBeenCalled();

        prisma.$transaction.mockReset();
        console.log.mockReset();
      });
    });

    test("should throw validation error invalid id body value - 422", async () => {
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ id: "notauuid" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.$transaction).not.toHaveBeenCalled();
    });
  });
});
