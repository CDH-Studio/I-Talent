const request = require("supertest");
const faker = require("faker");
const { getBearerToken } = require("../../../mocks");

const path = "/api/option/categories";

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
            opCategoryId: 1,
            name: "z",
          },
          {
            opCategoryId: 2,
            name: "B",
          },
        ],
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
            opCategoryId: 3,
            name: "b",
          },
        ],
        [
          {
            id: 3,
            name: "b",
          },
        ],
      ],
    ];

    describe.each(data)("in %s", (language, prismaData, result) => {
      let res;

      beforeAll(async () => {
        prisma.opTransCategory.findMany.mockResolvedValue(prismaData);

        res = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());
      });

      afterAll(() => {
        prisma.opTransCategory.findMany.mockReset();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.opTransCategory.findMany).toHaveBeenCalledWith({
          where: {
            language,
          },
          select: {
            opCategoryId: true,
            name: true,
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
        prisma.opTransCategory.findMany.mockRejectedValue(new Error());

        const dbRes = await request(app)
          .get(`${path}?language=${language}`)
          .set("Authorization", getBearerToken());

        expect(dbRes.statusCode).toBe(500);
        expect(dbRes.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.opTransCategory.findMany).toHaveBeenCalled();

        prisma.opTransCategory.findMany.mockReset();
      });
    });

    test("should throw validation error without language query param - 422", async () => {
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransCategory.findMany).not.toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=asdfafse`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.opTransCategory.findMany).not.toHaveBeenCalled();
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
      const data = [
        ["when 'ids' array is empty", []],
        [
          "when 'ids' array has multiple UUID",
          [faker.datatype.uuid(), faker.datatype.uuid(), faker.datatype.uuid()],
        ],
        ["when 'ids' array has a single UUID", [faker.datatype.uuid()]],
      ];

      describe.each(data)("%s", (_testLabel, ids) => {
        let res;

        beforeAll(async () => {
          prisma.opTransCategory.deleteMany.mockReturnValue(1);
          prisma.opCategory.deleteMany.mockReturnValue(2);

          res = await request(app)
            .delete(path)
            .set("Authorization", getBearerToken(["manage-options"]))
            .send({ ids });
        });

        afterAll(() => {
          prisma.opTransCategory.deleteMany.mockReset();
          prisma.opCategory.deleteMany.mockReset();
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
              opCategoryId: {
                in: ids,
              },
            },
          });

          expect(prisma.opCategory.deleteMany).toHaveBeenCalledWith({
            where: {
              id: {
                in: ids,
              },
            },
          });

          expect(prisma.$transaction).toHaveBeenCalledWith([1, 2]);
        });
      });

      test("should trigger error if there's a database problem - 500", async () => {
        prisma.$transaction.mockRejectedValue(new Error());

        const res = await request(app)
          .delete(path)
          .set("Authorization", getBearerToken(["manage-options"]))
          .send({ ids: [] });

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe("Internal Server Error");
        expect(console.log).toHaveBeenCalled();
        expect(prisma.$transaction).toHaveBeenCalled();

        prisma.$transaction.mockReset();
        console.log.mockReset();
      });
    });

    test("should throw validation error if body doesn't contain 'ids' - 422", async () => {
      const res = await request(app)
        .delete(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({});

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.$transaction).not.toHaveBeenCalled();
    });

    test("should throw validation error if 'ids' isn't an array - 422", async () => {
      const res = await request(app)
        .delete(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ ids: "notAnArray" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.$transaction).not.toHaveBeenCalled();
    });

    test("should throw validation error if 'ids' doesn't contain UUID in the array - 422", async () => {
      const res = await request(app)
        .delete(path)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ ids: ["notAUUID"] });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.$transaction).not.toHaveBeenCalled();
    });
  });
});
