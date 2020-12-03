const request = require("supertest");
const _ = require("lodash");
const faker = require("faker");
const { getBearerToken, userId } = require("../../../mocks");

const path = "/api/connections";

describe(`GET ${path}/:id`, () => {
  describe("when not authenticated", () => {
    test("should not process request - 403", async (done) => {
      const res = await request(app).get(`${path}/somestring`);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();

      done();
    });
  });

  describe("when authenticated", () => {
    const conId = faker.random.uuid();
    const data = [
      [
        "connectionId is a connection",
        conId,
        {
          connections: [
            { id: faker.random.uuid() },
            { id: conId },
            { id: faker.random.uuid() },
            { id: faker.random.uuid() },
          ],
        },
        { status: true },
      ],
      [
        "connectionId is not a connection",
        faker.random.uuid(),
        {
          connections: [
            { id: faker.random.uuid() },
            { id: faker.random.uuid() },
            { id: faker.random.uuid() },
            { id: faker.random.uuid() },
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
            prisma.user.findOne.mockResolvedValue(prismaData);

            res = await request(app)
              .get(`${path}/${connectionId}`)
              .set("Authorization", getBearerToken());
          });

          afterAll(() => {
            prisma.user.findOne.mockClear();
          });

          test("should process request - 200", () => {
            expect(res.statusCode).toBe(200);
            expect(console.log).not.toHaveBeenCalled();
          });

          test("should call prisma with specified params", () => {
            expect(prisma.user.findOne).toHaveBeenCalledWith({
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

    test("should trigger error if there's a database problem - 500", async (done) => {
      prisma.user.findOne.mockRejectedValue(new Error());

      const res = await request(app)
        .get(`${path}/${faker.random.uuid()}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.findOne).toHaveBeenCalled();

      prisma.user.findOne.mockClear();
      console.log.mockClear();

      done();
    });

    test("should throw validation error if param is not a UUID - 422", async (done) => {
      const res = await request(app)
        .put(`${path}/randomstring}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.findOne).not.toHaveBeenCalled();

      console.log.mockClear();

      done();
    });
  });
});

describe(`POST ${path}/:id`, () => {
  describe("when not authenticated", () => {
    test("should not process request - 403", async (done) => {
      const res = await request(app).post(`${path}/somestring`);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();

      done();
    });
  });

  describe("when authenticated", () => {
    describe("when doing a normal query", () => {
      const connectionId = faker.random.uuid();
      let res;

      beforeAll(async () => {
        res = await request(app)
          .post(`${path}/${connectionId}`)
          .set("Authorization", getBearerToken());
      });

      afterAll(() => {
        prisma.user.update.mockClear();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
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
        expect(res.text).toStrictEqual("OK");
      });
    });

    test("should trigger error if there's a database problem - 500", async (done) => {
      prisma.user.update.mockRejectedValue(new Error());

      const res = await request(app)
        .post(`${path}/${faker.random.uuid()}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalled();

      prisma.user.update.mockClear();
      console.log.mockClear();

      done();
    });

    test("should throw validation error if param is not a UUID - 422", async (done) => {
      const res = await request(app)
        .post(`${path}/randomstring}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.update).not.toHaveBeenCalled();

      console.log.mockClear();

      done();
    });
  });
});

describe(`DELETE ${path}/:id`, () => {
  describe("when not authenticated", () => {
    test("should not process request - 403", async (done) => {
      const res = await request(app).delete(`${path}/somestring`);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();

      done();
    });
  });

  describe("when authenticated", () => {
    describe("when doing a normal query", () => {
      const connectionId = faker.random.uuid();
      let res;

      beforeAll(async () => {
        res = await request(app)
          .delete(`${path}/${connectionId}`)
          .set("Authorization", getBearerToken());
      });

      afterAll(() => {
        prisma.user.update.mockClear();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
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
        expect(res.text).toStrictEqual("OK");
      });
    });

    test("should trigger error if there's a database problem - 500", async (done) => {
      prisma.user.update.mockRejectedValue(new Error());

      const res = await request(app)
        .delete(`${path}/${faker.random.uuid()}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalled();

      prisma.user.update.mockClear();
      console.log.mockClear();

      done();
    });

    test("should throw validation error if param is not a UUID - 422", async (done) => {
      const res = await request(app)
        .delete(`${path}/randomstring}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.update).not.toHaveBeenCalled();

      console.log.mockClear();

      done();
    });
  });
});
