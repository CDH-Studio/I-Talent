const request = require("supertest");
const faker = require("faker");
const axios = require("axios");
const { getBearerToken } = require("../../../mocks");

const path = "/api/profGen";

describe(`GET ${path}`, () => {
  beforeEach(() => console.log.mockClear());

  describe("when not authenticated", () => {
    test("should not process request - 403", async () => {
      const res = await request(app).get(`${path}/${faker.random.uuid()}`);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  test.todo("when everything works well");

  test("should trigger error if user does not exist in db - 500", async () => {
    axios.mockResolvedValue({ data: [] });
    prisma.user.findOne.mockResolvedValue(undefined);

    const res = await request(app)
      .get(`${path}/${faker.random.uuid()}`)
      .set("Authorization", getBearerToken());

    expect(res.statusCode).toBe(500);
    expect(res.text).toBe("Internal Server Error");
    expect(console.log).toHaveBeenCalled();
    expect(prisma.user.findOne).toHaveBeenCalled();
    expect(axios).toHaveBeenCalled();

    axios.mockClear();
    prisma.user.findOne.mockClear();
  });

  test("should trigger error if GEDS API returns an empty array - 500", async () => {
    axios.mockResolvedValue({ data: [] });
    prisma.user.findOne.mockResolvedValue({ email: "" });

    const res = await request(app)
      .get(`${path}/${faker.random.uuid()}`)
      .set("Authorization", getBearerToken());

    expect(res.statusCode).toBe(500);
    expect(res.text).toBe("Internal Server Error");
    expect(console.log).toHaveBeenCalled();
    expect(prisma.user.findOne).toHaveBeenCalled();
    expect(axios).toHaveBeenCalled();

    axios.mockClear();
    prisma.user.findOne.mockClear();
  });

  test("should trigger error if there's a database problem - 500", async () => {
    axios.mockResolvedValue({ data: [] });
    prisma.user.findOne.mockRejectedValue(new Error());

    const res = await request(app)
      .get(`${path}/${faker.random.uuid()}`)
      .set("Authorization", getBearerToken());

    expect(res.statusCode).toBe(500);
    expect(res.text).toBe("Internal Server Error");
    expect(console.log).toHaveBeenCalled();
    expect(prisma.user.findOne).toHaveBeenCalled();
    expect(axios).toHaveBeenCalled();

    axios.mockClear();
    prisma.user.findOne.mockClear();
  });

  test("should trigger error if there's an axios problem - 500", async () => {
    axios.mockRejectedValue(new Error());
    prisma.user.findOne.mockResolvedValue({ email: "" });

    const res = await request(app)
      .get(`${path}/${faker.random.uuid()}`)
      .set("Authorization", getBearerToken());

    expect(res.statusCode).toBe(500);
    expect(res.text).toBe("Internal Server Error");
    expect(console.log).toHaveBeenCalled();
    expect(prisma.user.findOne).toHaveBeenCalled();
    expect(axios).toHaveBeenCalled();

    axios.mockClear();
    prisma.user.findOne.mockClear();
  });

  test("should throw validation error if param is not a UUID - 422", async () => {
    const res = await request(app)
      .get(`${path}/randomstring}`)
      .set("Authorization", getBearerToken());

    expect(res.statusCode).toBe(422);
    expect(console.log).toHaveBeenCalled();
    expect(prisma.user.findOne).not.toHaveBeenCalled();
  });
});
