const request = require("supertest");
const faker = require("faker");
const { getBearerToken, userId } = require("../../../mocks");

const createFakeBug = (hasAppVersion, hasGithubIssue) => {
  const bug = {
    id: faker.random.uuid(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    userId: faker.random.uuid(),
    userName: faker.name.findName(),
    description: faker.lorem.paragraphs(),
    appVersion: faker.random.alphaNumeric(),
    githubIssue: faker.random.number(),
    location: faker.random.arrayElement(["HOME", "PROFILE", "SEARCH", "FORMS"]),
    status: faker.random.arrayElement(["UNRESOLVED", "RESOLVED", "DUPLICATE"]),
  };

  if (!hasAppVersion) {
    delete bug.appVersion;
  }

  if (!hasGithubIssue) {
    delete bug.githubIssue;
  }

  return bug;
};

const path = "/api/bugs";

describe(`GET ${path}`, () => {
  beforeEach(() => console.log.mockClear());

  describe("when not authenticated", () => {
    test("should not process request - 403", async (done) => {
      const res = await request(app).get(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();

      done();
    });
  });

  describe("when not authorised", () => {
    test("should not process request when user has incorrect keycloak role - 403", async (done) => {
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken(["role"]));

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();

      done();
    });
  });

  describe("when authenticated", () => {
    const data = [
      createFakeBug(false, false),
      createFakeBug(true, false),
      createFakeBug(false, true),
      createFakeBug(true, true),
      createFakeBug(true, false),
      createFakeBug(false, false),
    ];

    describe("when doing a normal query", () => {
      let res;

      beforeAll(async () => {
        prisma.bug.findMany.mockResolvedValue(data);

        res = await request(app)
          .get(path)
          .set("Authorization", getBearerToken(["view-admin-console"]));
      });

      afterAll(() => {
        prisma.bug.findMany.mockClear();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.bug.findMany).toHaveBeenCalledWith({
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            description: true,
            location: true,
            status: true,
            appVersion: true,
            githubIssue: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });
      });

      test("should return expected result", () => {
        expect(res.body).toStrictEqual(data);
      });
    });

    test("should trigger error if there's a database problem - 500", async (done) => {
      prisma.bug.findMany.mockRejectedValue(new Error());
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken(["view-admin-console"]));

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.bug.findMany).toHaveBeenCalled();

      prisma.bug.findMany.mockClear();

      done();
    });
  });
});

describe(`POST ${path}`, () => {
  beforeEach(() => console.log.mockClear());

  describe("when not authenticated", () => {
    test("should not process request - 403", async (done) => {
      const res = await request(app).post(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();

      done();
    });
  });

  describe("when authenticated", () => {
    describe("when doing a normal query", () => {
      const data = {
        description: faker.lorem.paragraphs(),
        location: faker.random.arrayElement([
          "HOME",
          "PROFILE",
          "SEARCH",
          "FORMS",
        ]),
      };

      let res;

      beforeAll(async () => {
        res = await request(app)
          .post(path)
          .set("Authorization", getBearerToken())
          .send(data);
      });

      afterAll(() => {
        prisma.bug.create.mockClear();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toStrictEqual("OK");
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.bug.create).toHaveBeenCalledWith({
          data: {
            ...data,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
      });
    });

    test("should trigger error if there's a database problem - 500", async (done) => {
      prisma.bug.create.mockRejectedValue(new Error());
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken())
        .send({ description: "", location: "HOME" });

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.bug.create).toHaveBeenCalled();

      prisma.bug.create.mockClear();
      console.log.mockClear();

      done();
    });

    test("should throw validation error without description in body - 422", async (done) => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken())
        .send({ location: "HOME" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.bug.create).not.toHaveBeenCalled();

      console.log.mockClear();

      done();
    });

    test("should throw validation error if description is not a string in body - 422", async (done) => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken())
        .send({ description: [], location: "HOME" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.bug.create).not.toHaveBeenCalled();

      console.log.mockClear();

      done();
    });

    test("should throw validation error without location in body - 422", async (done) => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken())
        .send({ description: "" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.bug.create).not.toHaveBeenCalled();

      console.log.mockClear();

      done();
    });

    test("should throw validation error if invalid value for location in body - 422", async (done) => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken())
        .send({ description: "", location: "" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.bug.create).not.toHaveBeenCalled();

      console.log.mockClear();

      done();
    });
  });
});

describe(`PUT ${path}/:id`, () => {
  beforeEach(() => console.log.mockClear());

  describe("when not authenticated", () => {
    test("should not process request - 403", async (done) => {
      const res = await request(app).post(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();

      done();
    });
  });

  describe("when not authorised", () => {
    test("should not process request when user has incorrect keycloak role - 403", async (done) => {
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken(["role"]));

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();

      done();
    });
  });

  describe("when authenticated", () => {
    describe("when doing a normal query", () => {
      test.todo("should process request - 200");
    });

    test("should throw validation error if param is not a UUID - 422", async (done) => {
      const res = await request(app)
        .put(`${path}/randomstring}`)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({});

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.bug.update).not.toHaveBeenCalled();

      console.log.mockClear();

      done();
    });

    test("should throw validation error if description is not a string in body - 422", async (done) => {
      const res = await request(app)
        .put(`${path}/${faker.random.uuid()}`)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ description: [] });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.bug.update).not.toHaveBeenCalled();

      console.log.mockClear();

      done();
    });

    test("should throw validation error if invalid value for location in body - 422", async (done) => {
      const res = await request(app)
        .put(`${path}/${faker.random.uuid()}`)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ location: "" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.bug.update).not.toHaveBeenCalled();

      console.log.mockClear();

      done();
    });

    test("should throw validation error if githubIssue is not an integer in body - 422", async (done) => {
      const res = await request(app)
        .put(`${path}/${faker.random.uuid()}`)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ githubIssue: "randomstring" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.bug.update).not.toHaveBeenCalled();

      console.log.mockClear();

      done();
    });

    test("should throw validation error if invalid value for status in body - 422", async (done) => {
      const res = await request(app)
        .put(`${path}/${faker.random.uuid()}`)
        .set("Authorization", getBearerToken(["manage-options"]))
        .send({ status: "" });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.bug.update).not.toHaveBeenCalled();

      console.log.mockClear();

      done();
    });
  });
});
