const request = require("supertest");
const faker = require("faker");
const { getBearerToken, userId } = require("../../../mocks");

const path = "/api/connections";

describe(`GET ${path}/:id`, () => {
  beforeEach(() => console.log.mockReset());

  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).get(`${path}/somestring`);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    const conId = faker.datatype.uuid();
    const data = [
      [
        "connectionId is a connection",
        conId,
        {
          connections: [
            { id: faker.datatype.uuid() },
            { id: conId },
            { id: faker.datatype.uuid() },
            { id: faker.datatype.uuid() },
          ],
        },
        { status: true },
      ],
      [
        "connectionId is not a connection",
        faker.datatype.uuid(),
        {
          connections: [
            { id: faker.datatype.uuid() },
            { id: faker.datatype.uuid() },
            { id: faker.datatype.uuid() },
            { id: faker.datatype.uuid() },
          ],
        },
        { status: false },
      ],
    ];

    describe.each(data)(
      "when %s",
      (_testLabel, connectionId, prismaData, result) => {
        describe("when doing a normal query", () => {
          let res;

          beforeAll(async () => {
            prisma.user.findUnique.mockResolvedValue(prismaData);

            res = await request(app)
              .get(`${path}/${connectionId}`)
              .set("Authorization", getBearerToken());
          });

          afterAll(() => {
            prisma.user.findUnique.mockReset();
          });

          test("should process request - 200", () => {
            expect(res.statusCode).toBe(200);
            expect(console.log).not.toHaveBeenCalled();
          });

          test("should call prisma with specified params", () => {
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
              where: {
                id: userId,
              },
              select: {
                connections: { select: { id: true } },
              },
            });
          });

          test("should return expected result", () => {
            expect(res.body).toStrictEqual(result);
          });
        });
      }
    );

    test("should trigger error if there's a database problem - 500", async () => {
      prisma.user.findUnique.mockRejectedValue(new Error());

      const res = await request(app)
        .get(`${path}/${faker.datatype.uuid()}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.findUnique).toHaveBeenCalled();

      prisma.user.findUnique.mockReset();
    });

    test("should throw validation error if param is not a UUID - 422", async () => {
      const res = await request(app)
        .get(`${path}/randomstring}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.findUnique).not.toHaveBeenCalled();
    });
  });
});

describe(`POST ${path}/:id`, () => {
  beforeEach(() => console.log.mockReset());

  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).post(`${path}/somestring`);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    describe("when doing a normal query", () => {
      const connectionId = faker.datatype.uuid();
      let res;

      beforeAll(async () => {
        res = await request(app)
          .post(`${path}/${connectionId}`)
          .set("Authorization", getBearerToken());
      });

      afterAll(() => {
        prisma.user.update.mockReset();
      });

      test("should process request - 201", () => {
        expect(res.statusCode).toBe(201);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.user.update).toHaveBeenCalledWith({
          where: {
            id: userId,
          },
          data: {
            connections: {
              connect: {
                id: connectionId,
              },
            },
          },
        });
      });

      test("should return expected result", () => {
        expect(res.text).toStrictEqual("Created");
      });
    });

    test("should trigger error if there's a database problem - 500", async () => {
      prisma.user.update.mockRejectedValue(new Error());

      const res = await request(app)
        .post(`${path}/${faker.datatype.uuid()}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalled();

      prisma.user.update.mockReset();
    });

    test("should throw validation error if param is not a UUID - 422", async () => {
      const res = await request(app)
        .post(`${path}/randomstring}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.update).not.toHaveBeenCalled();
    });
  });
});

describe(`DELETE ${path}/:id`, () => {
  beforeEach(() => console.log.mockReset());

  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).delete(`${path}/somestring`);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    describe("when doing a normal query", () => {
      const connectionId = faker.datatype.uuid();
      let res;

      beforeAll(async () => {
        res = await request(app)
          .delete(`${path}/${connectionId}`)
          .set("Authorization", getBearerToken());
      });

      afterAll(() => {
        prisma.user.update.mockReset();
      });

      test("should process request - 204", () => {
        expect(res.statusCode).toBe(204);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.user.update).toHaveBeenCalledWith({
          where: {
            id: userId,
          },
          data: {
            connections: {
              disconnect: {
                id: connectionId,
              },
            },
          },
        });
      });

      test("should return expected result", () => {
        expect(res.text).toStrictEqual("");
      });
    });

    test("should trigger error if there's a database problem - 500", async () => {
      prisma.user.update.mockRejectedValue(new Error());

      const res = await request(app)
        .delete(`${path}/${faker.datatype.uuid()}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalled();

      prisma.user.update.mockReset();
    });

    test("should throw validation error if param is not a UUID - 422", async () => {
      const res = await request(app)
        .delete(`${path}/randomstring}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.update).not.toHaveBeenCalled();
    });
  });
});
