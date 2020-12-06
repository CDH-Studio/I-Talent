const request = require("supertest");
const faker = require("faker");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/diploma";

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
        prisma.opDiploma.create.mockReset();
      });

      test("should process request - 201", () => {
        expect(res.statusCode).toBe(201);
        expect(res.text).toStrictEqual("Created");
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opDiploma.create).toHaveBeenCalledWith({
          data: {
            translations: {
              create: [
                {
                  description: body.en,
                  language: "ENGLISH",
                },
                {
                  description: body.fr,
                  language: "FRENCH",
                },
              ],
            },
          },
        });
      });

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.opDiploma.create.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .post(path)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send(body);

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opDiploma.create).toHaveBeenCalled();

        prisma.opDiploma.create.mockReset();
      });
    });

    test("should throw validation error invalid en body value - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ fr: "data", en: [] });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opDiploma.create).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid fr body value - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ fr: [], en: "data" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opDiploma.create).not.toHaveBeenCalled();
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
        prisma.opDiploma.update.mockReset();
      });

      test("should process request - 204", () => {
        expect(res.statusCode).toBe(204);
        expect(res.text).toStrictEqual("");
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opDiploma.update).toHaveBeenCalledWith({
          where: {
            id: body.id,
          },
          data: {
            translations: {
              updateMany: [
                {
                  where: {
                    language: "ENGLISH",
                  },
                  data: {
                    description: body.en,
                  },
                },
                {
                  where: {
                    language: "FRENCH",
                  },
                  data: {
                    description: body.fr,
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
          fr: "data",
          en: "data",
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opDiploma.update).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid en body value - 422", async () => {
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({
          id: faker.random.uuid(),
          fr: "data",
          en: [],
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opDiploma.update).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid fr body value - 422", async () => {
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({
          id: faker.random.uuid(),
          fr: [],
          en: "data",
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opDiploma.update).not.toHaveBeenCalled();
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
        prisma.opTransDiploma.deleteMany.mockReturnValue(1);
        prisma.opDiploma.delete.mockReturnValue(2);

        res = await request(app)
          .delete(path)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send({ id });
      });

      afterAll(() => {
        prisma.opTransDiploma.deleteMany.mockReset();
        prisma.opDiploma.delete.mockReset();
        prisma.$transaction.mockReset();
      });

      test("should process request - 204", () => {
        expect(res.statusCode).toBe(204);
        expect(res.text).toStrictEqual("");
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opTransDiploma.deleteMany).toHaveBeenCalledWith({
          where: {
            opDiplomaId: id,
          },
        });

        expect(prisma.opDiploma.delete).toHaveBeenCalledWith({
          where: {
            id,
          },
        });

        expect(prisma.$transaction).toHaveBeenCalledWith([1, 2]);
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
