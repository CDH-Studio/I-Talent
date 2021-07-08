const request = require("supertest");
const faker = require("faker");
const _ = require("lodash");
const { getBearerToken, userId } = require("../../../mocks");

const path = "/api/user";

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
        "when user exists in db",
        {
          id: userId,
          name: "John Doe",
          email: "email@example.com",
          status: "ACTIVE",
          avatarColor: "#0bdaa3",
          firstName: "John",
          lastName: "Doe",
          createdAt: "2020-11-03T21:18:38.793Z",
          updatedAt: "2020-12-03T21:18:38.793Z",
          signupStep: 8,
          preferredLanguage: "ENGLISH",
        },
        200,
        `{"id":"${userId}","name":"John Doe","email":"email@example.com","status":"ACTIVE","avatarColor":"#0bdaa3","firstName":"John","lastName":"Doe","createdAt":"2020-11-03T21:18:38.793Z","updatedAt":"2020-12-03T21:18:38.793Z","signupStep":8,"preferredLanguage":"ENGLISH","nameInitials":"JD"}`,
      ],
      ["when user has not been created", undefined, 404, "Not Found"],
    ];

    describe.each(data)(
      "when %s",
      (_testLabel, prismaData, statusCode, result) => {
        let res;

        beforeAll(async () => {
          prisma.user.findUnique.mockResolvedValue(prismaData);

          res = await request(app)
            .get(path)
            .set("Authorization", getBearerToken());
        });

        afterAll(() => {
          prisma.user.findUnique.mockReset();
        });

        test(`should process request - ${statusCode}`, () => {
          expect(res.statusCode).toBe(statusCode);
          expect(console.log).not.toHaveBeenCalled();
        });

        test("should call prisma with specified params", () => {
          expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: {
              id: userId,
            },
            select: {
              id: true,
              name: true,
              email: true,
              status: true,
              avatarColor: true,
              firstName: true,
              lastName: true,
              createdAt: true,
              updatedAt: true,
              signupStep: true,
              preferredLanguage: true,
            },
          });
        });

        test("should return expected result", () => {
          expect(res.text).toBe(result);
        });
      }
    );

    test("should trigger error if there's a database problem - 500", async () => {
      prisma.user.findUnique.mockRejectedValue(new Error());

      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.findUnique).toHaveBeenCalled();

      prisma.user.findUnique.mockReset();
    });
  });
});

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

  describe("when authenticated", () => {
    const data = {
      id: userId,
      name: faker.name.findName(),
      email: faker.internet.email(),
      status: "ACTIVE",
      avatarColor: "#FFFFFF",
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      createdAt: "2020-11-03T21:18:38.793Z",
      updatedAt: "2020-12-03T21:18:38.793Z",
      signupStep: 0,
    };

    describe("when doing a normal query", () => {
      let res;

      beforeAll(async () => {
        prisma.user.create.mockResolvedValue(data);

        res = await request(app)
          .post(path)
          .set("Authorization", getBearerToken())
          .send({
            name: data.name,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          });
      });

      afterAll(() => {
        prisma.user.create.mockReset();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.user.create).toHaveBeenCalledWith({
          data: {
            id: userId,
            name: data.name,
            email: data.email,
            firstName: _.upperFirst(data.firstName),
            lastName: _.upperFirst(data.lastName),
            avatarColor: expect.any(String),
            visibleCards: { create: {} },
          },
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            avatarColor: true,
            firstName: true,
            lastName: true,
            createdAt: true,
            updatedAt: true,
            signupStep: true,
          },
        });
      });

      test("should return expected result", () => {
        expect(res.body).toStrictEqual({
          ...data,
          nameInitials: `${data.firstName[0]}${data.lastName[0]}`,
        });
      });
    });

    test("should trigger error if there's a database problem - 500", async () => {
      prisma.user.create.mockRejectedValue(new Error());

      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken())
        .send({
          name: faker.name.findName(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
        });

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.create).toHaveBeenCalled();

      prisma.user.create.mockReset();
    });

    test("should throw validation error if name is missing in body - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken())
        .send({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.create).not.toHaveBeenCalled();

      console.log.mockReset();
    });

    test("should throw validation error if name is not a string in body - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken())
        .send({
          name: [],
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.create).not.toHaveBeenCalled();

      console.log.mockReset();
    });

    test("should throw validation error if firstName is missing in body - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken())
        .send({
          name: faker.name.findName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.create).not.toHaveBeenCalled();

      console.log.mockReset();
    });

    test("should throw validation error if firstName is not a string in body - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken())
        .send({
          name: faker.name.findName(),
          firstName: [],
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.create).not.toHaveBeenCalled();

      console.log.mockReset();
    });

    test("should throw validation error if lastName is missing in body - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken())
        .send({
          name: faker.name.findName(),
          firstName: faker.name.firstName(),
          email: faker.internet.email(),
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.create).not.toHaveBeenCalled();

      console.log.mockReset();
    });

    test("should throw validation error if lastName is not a string in body - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken())
        .send({
          name: faker.name.findName(),
          firstName: faker.name.firstName(),
          lastName: [],
          email: faker.internet.email(),
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.create).not.toHaveBeenCalled();

      console.log.mockReset();
    });

    test("should throw validation error if email is missing in body - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken())
        .send({
          name: faker.name.findName(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.create).not.toHaveBeenCalled();

      console.log.mockReset();
    });

    test("should throw validation error if email is not a valid email in body - 422", async () => {
      const res = await request(app)
        .post(path)
        .set("Authorization", getBearerToken())
        .send({
          name: faker.name.findName(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: "this is not an email",
        });

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.create).not.toHaveBeenCalled();

      console.log.mockReset();
    });
  });
});

describe(`DELETE ${path}/:id`, () => {
  beforeEach(() => console.log.mockReset());

  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).delete(`${path}/${faker.datatype.uuid()}`);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when not authorised", () => {
    test("should not process request if not admin and not deleting itself - 403", async () => {
      const res = await request(app)
        .delete(`${path}/${faker.datatype.uuid()}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Forbidden");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    const data = [
      ["when deleting yourself", userId, undefined],
      [
        "when deleting someone else as and admin",
        faker.datatype.uuid(),
        ["manage-users"],
      ],
    ];

    describe.each(data)("%s", (_testLabel, id, roles) => {
      let res;

      beforeAll(async () => {
        res = await request(app)
          .delete(`${path}/${id}`)
          .set("Authorization", getBearerToken(roles));
      });

      test("should process request - 204", () => {
        expect(res.statusCode).toBe(204);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.competency.deleteMany).toHaveBeenCalledWith({
          where: { userId },
        });
        expect(prisma.mentorshipSkill.deleteMany).toHaveBeenCalledWith({
          where: { userId },
        });
        expect(prisma.skill.deleteMany).toHaveBeenCalledWith({
          where: { userId },
        });
        expect(prisma.developmentalGoal.deleteMany).toHaveBeenCalledWith({
          where: { userId },
        });
        expect(prisma.secondLangProf.deleteMany).toHaveBeenCalledWith({
          where: { userId },
        });
        expect(prisma.organization.deleteMany).toHaveBeenCalledWith({
          where: { userId },
        });
        expect(prisma.education.deleteMany).toHaveBeenCalledWith({
          where: { userId },
        });
        expect(prisma.qualifiedPool.deleteMany).toHaveBeenCalledWith({
          where: { userId },
        });
        expect(prisma.experience.deleteMany).toHaveBeenCalledWith({
          where: { userId },
        });
        expect(prisma.relocationLocation.deleteMany).toHaveBeenCalledWith({
          where: { userId },
        });
        expect(prisma.user.delete).toHaveBeenCalledWith({
          where: { id: userId },
        });
      });

      test("should return expected result", () => {
        expect(res.text).toBe("");
      });
    });

    test("should trigger error if there's a database problem - 500", async () => {
      prisma.$transaction.mockRejectedValue(new Error());

      const res = await request(app)
        .delete(`${path}/${userId}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.$transaction).toHaveBeenCalled();

      prisma.$transaction.mockReset();
    });

    test("should throw validation error if param is not a UUID - 422", async () => {
      const res = await request(app)
        .delete(`${path}/randomstring}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.$transaction).not.toHaveBeenCalled();

      console.log.mockReset();
    });
  });
});
