const request = require("supertest");
const faker = require("faker");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/school";

describe(`POST ${path}`, () => {
  beforeEach(() => console.log.mockClear());

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
      const data = [
        [
          "when 'en' is specifed",
          {
            abbrCountry: "CAN",
            abbrProvince: "on",
            en: "a",
          },
          [{ name: "a", language: "ENGLISH" }],
        ],
        [
          "when 'fr' is specifed",
          {
            abbrCountry: "CAN",
            abbrProvince: "on",
            fr: "a",
          },
          [{ name: "a", language: "FRENCH" }],
        ],
        [
          "when 'en' and 'fr' are specifed",
          {
            abbrCountry: "CAN",
            abbrProvince: "on",
            en: "a",
            fr: "b",
          },
          [
            { name: "a", language: "ENGLISH" },
            { name: "b", language: "FRENCH" },
          ],
        ],
      ];

      describe.each(data)("%s", (_testLabel, body, translations) => {
        let res;

        beforeAll(async () => {
          res = await request(app)
            .post(path)
            .set("Authorization", getBearerToken(["manage-options"]))
            .send(body);
        });

        afterAll(() => {
          prisma.opSchool.create.mockClear();
        });

        test("should process request - 201", () => {
          expect(res.statusCode).toBe(201);
          expect(res.text).toStrictEqual("Created");
          expect(console.log).not.toHaveBeenCalled();
        });

        test("should call prisma with specified params", () => {
          expect(prisma.opSchool.create).toHaveBeenCalledWith({
            data: {
              abbrCountry: body.abbrCountry,
              abbrProvince: body.abbrProvince,
              translations: {
                create: translations,
              },
            },
          });
        });
      });

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.opSchool.create.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .post(path)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send({
            abbrCountry: "CAN",
            abbrProvince: "on",
            en: "a",
          });

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opSchool.create).toHaveBeenCalled();

        prisma.opSchool.create.mockClear();
      });
    });

    test("should throw validation error invalid en body value - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ en: [], abbrCountry: "abc", abbrProvince: "ab" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSchool.create).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid fr body value - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ fr: [], abbrCountry: "abc", abbrProvince: "ab" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSchool.create).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid abbrCountry body value - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ fr: "data", abbrCountry: "aaaaaaa", abbrProvince: "ab" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSchool.create).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid abbrProvince body value - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ en: "data", abbrCountry: "abc", abbrProvince: "aaaaaaa" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSchool.create).not.toHaveBeenCalled();
    });
  });
});

describe(`PUT ${path}`, () => {
  beforeEach(() => console.log.mockClear());

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
      const data = [
        [
          "when 'en' is specifed and 'en' exists in db",
          {
            id: faker.random.uuid(),
            abbrCountry: "CAN",
            abbrProvince: "on",
            en: "a",
          },
          { translations: [{ language: "ENGLISH" }] },
          [
            {
              where: {
                language: "ENGLISH",
              },
              data: {
                name: "a",
              },
            },
          ],
          [],
        ],
        [
          "when 'en' is specifed and 'en' does not exist in db",
          {
            id: faker.random.uuid(),
            abbrCountry: "CAN",
            abbrProvince: "on",
            en: "a",
          },
          { translations: [{ language: "FRENCH" }] },
          [],
          [
            {
              name: "a",
              language: "ENGLISH",
            },
          ],
        ],
        [
          "when 'fr' is specifed an 'fr' exists in db",
          {
            id: faker.random.uuid(),
            abbrCountry: "CAN",
            abbrProvince: "on",
            fr: "a",
          },
          { translations: [{ language: "FRENCH" }] },
          [
            {
              where: {
                language: "FRENCH",
              },
              data: {
                name: "a",
              },
            },
          ],
          [],
        ],
        [
          "when 'fr' is specifed an 'fr' does not exist in db",
          {
            id: faker.random.uuid(),
            abbrCountry: "CAN",
            abbrProvince: "on",
            fr: "a",
          },
          { translations: [] },
          [],
          [
            {
              name: "a",
              language: "FRENCH",
            },
          ],
        ],
        [
          "when 'en' and 'fr' are specifed",
          {
            id: faker.random.uuid(),
            abbrCountry: "CAN",
            abbrProvince: "on",
            en: "a",
            fr: "b",
          },
          { translations: [{ language: "ENGLISH" }] },
          [
            {
              where: {
                language: "ENGLISH",
              },
              data: {
                name: "a",
              },
            },
          ],
          [
            {
              name: "b",
              language: "FRENCH",
            },
          ],
        ],
      ];

      describe.each(data)(
        "%s",
        (
          _testLabel,
          body,
          prismaFindOne,
          updateTranslations,
          createTranslations
        ) => {
          let res;

          beforeAll(async () => {
            prisma.opSchool.findOne.mockResolvedValue(prismaFindOne);

            res = await request(app)
              .put(path)
              .set("Authorization", getBearerToken(["manage-options"]))
              .send(body);
          });

          afterAll(() => {
            prisma.opSchool.findOne.mockClear();
            prisma.opSchool.update.mockClear();
          });

          test("should process request - 204", () => {
            expect(res.statusCode).toBe(204);
            expect(res.text).toStrictEqual("");
            expect(console.log).not.toHaveBeenCalled();
          });

          test("should call prisma with specified params", () => {
            expect(prisma.opSchool.findOne).toHaveBeenCalledWith({
              where: {
                id: body.id,
              },
              select: {
                translations: {
                  select: {
                    language: true,
                  },
                },
              },
            });

            expect(prisma.opSchool.update).toHaveBeenCalledWith({
              where: {
                id: body.id,
              },
              data: {
                abbrCountry: body.abbrCountry,
                abbrProvince: body.abbrProvince,
                translations: {
                  updateMany: updateTranslations,
                  create: createTranslations,
                },
              },
            });
          });
        }
      );

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.opSchool.findOne.mockRejectedValue(new Error());

        const res = await request(app)
          .put(path)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send({
            id: faker.random.uuid(),
            abbrCountry: "CAN",
            abbrProvince: "on",
            en: "a",
          });

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opSchool.findOne).toHaveBeenCalled();

        prisma.opSchool.findOne.mockClear();
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
          abbrCountry: "abc",
          abbrProvince: "ab",
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSchool.update).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid en body value - 422", async () => {
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({
          id: faker.random.uuid(),
          fr: "data",
          en: [],
          abbrCountry: "abc",
          abbrProvince: "ab",
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSchool.update).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid fr body value - 422", async () => {
      const res = await request(app)
        .put(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({
          id: faker.random.uuid(),
          fr: [],
          en: "data",
          abbrCountry: "abc",
          abbrProvince: "ab",
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSchool.update).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid abbrCountry body value - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({
          id: faker.random.uuid(),
          fr: "data",
          abbrCountry: "aaaaaaa",
          abbrProvince: "ab",
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSchool.create).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid abbrProvince body value - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({
          id: faker.random.uuid(),
          en: "data",
          abbrCountry: "abc",
          abbrProvince: "aaaaaaa",
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opSchool.create).not.toHaveBeenCalled();
    });
  });
});

describe(`DELETE ${path}`, () => {
  beforeEach(() => console.log.mockClear());

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
        prisma.opTransSchool.deleteMany.mockReturnValue(1);
        prisma.opSchool.delete.mockReturnValue(2);

        res = await request(app)
          .delete(path)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send({ id });
      });

      afterAll(() => {
        prisma.opTransSchool.deleteMany.mockClear();
        prisma.opSchool.delete.mockClear();
        prisma.$transaction.mockClear();
      });

      test("should process request - 204", () => {
        expect(res.statusCode).toBe(204);
        expect(res.text).toStrictEqual("");
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opTransSchool.deleteMany).toHaveBeenCalledWith({
          where: {
            opSchoolId: id,
          },
        });

        expect(prisma.opSchool.delete).toHaveBeenCalledWith({
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

        prisma.$transaction.mockClear();
        console.log.mockClear();
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
