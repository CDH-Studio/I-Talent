const request = require("supertest");
const faker = require("faker");

const path = "/api/stats/count/hiddenUsers";

describe(`Test ${path}`, () => {
  describe("when not authenticated", () => {
    test("should not process request - 403", async (done) => {
      const res = await request(app).get(path);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();

      done();
    });
  });

  describe("when authenticated", () => {
    test("should process request - 200", async (done) => {
      const randomNumber = faker.random.number(1000);

      prisma.user.count.mockResolvedValue(randomNumber);
      const res = await request(mockedApp).get(path);

      expect(res.statusCode).toBe(200);
      expect(res.body).toBe(randomNumber);
      expect(console.log).not.toHaveBeenCalled();
      expect(prisma.user.count).toHaveBeenCalledWith({
        where: {
          status: "HIDDEN",
        },
      });

      prisma.user.count.mockClear();

      done();
    });

    test("should trigger error if there's a database problem - 500", async (done) => {
      prisma.user.count.mockRejectedValue(new Error());
      const res = await request(mockedApp).get(path);

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Error getting hidden user count");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.count).toHaveBeenCalled();

      prisma.user.count.mockClear();
      console.log.mockClear();

      done();
    });
  });
});
