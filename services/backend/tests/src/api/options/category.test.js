const request = require("supertest");
const faker = require("faker");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/category";

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
        prisma.opCategory.create.mockReset();
      });

      test("should process request - 201", () => {
        expect(res.statusCode).toBe(201);
        expect(res.text).toStrictEqual("Created");
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opCategory.create).toHaveBeenCalledWith({
          data: {
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
        prisma.opCategory.create.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .post(path)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send(body);

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opCategory.create).toHaveBeenCalled();

        prisma.opCategory.create.mockReset();
      });
    });

    test("should throw validation error invalid en body value - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ fr: "data", en: [] });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opCategory.create).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid fr body value - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ fr: [], en: "data" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opCategory.create).not.toHaveBeenCalled();
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
        id: faker.datatype.uuid(),
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
        prisma.opCategory.update.mockReset();
      });

      test("should process request - 204", () => {
        expect(res.statusCode).toBe(204);
        expect(res.text).toStrictEqual("");
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opCategory.update).toHaveBeenCalledWith({
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
        .send({ id: "notauuid", fr: "data", en: "data" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opCategory.update).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid en body value - 422", async () => {
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ id: faker.datatype.uuid(), fr: "data", en: [] });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opCategory.update).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid fr body value - 422", async () => {
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ id: faker.datatype.uuid(), fr: [], en: "data" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opCategory.update).not.toHaveBeenCalled();
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
      const body = {
        id: faker.datatype.uuid(),
      };

      let res;

      beforeAll(async () => {
        prisma.opTransCategory.deleteMany.mockReturnValue(
          "opTransCategory.deleteMany"
        );
        prisma.opCategory.delete.mockReturnValue("opCategory.delete");

        res = await request(app)
          .delete(path)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send(body);
      });

      afterAll(() => {
        prisma.opTransCategory.deleteMany.mockReset();
        prisma.opCategory.delete.mockReset();
        prisma.$transaction.mockReset();
      });

      test("should process request - 204", () => {
        expect(res.statusCode).toBe(204);
        expect(res.text).toStrictEqual("");
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opTransCategory.deleteMany).toHaveBeenCalledWith({
          where: {
            opCategoryId: body.id,
          },
        });

        expect(prisma.opCategory.delete).toHaveBeenCalledWith({
          where: {
            id: body.id,
          },
        });

        expect(prisma.$transaction).toHaveBeenCalledWith([
          "opTransCategory.deleteMany",
          "opCategory.delete",
        ]);
      });

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.$transaction.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .delete(path)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send(body);

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
