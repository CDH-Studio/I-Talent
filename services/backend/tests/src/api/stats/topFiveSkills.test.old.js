const request = require("supertest");

const path = "/api/stats/topFiveSkills";

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
    test("should process request in English - 200", async (done) => {
      const res = await request(mockedApp).get(`${path}?language=ENGLISH`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual([
        { name: "Clerical", count: 1 },
        { name: "Executive Support", count: 1 },
        { name: "Financial Policy", count: 1 },
        { name: "Statistics", count: 1 },
        { name: "Teaching (Instructor)", count: 1 },
      ]);
      expect(console.log).not.toHaveBeenCalled();

      done();
    });

    test("should process request in French - 200", async (done) => {
      const res = await request(mockedApp).get(`${path}?language=FRENCH`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual([
        { name: "Enseignement (instructeur)", count: 1 },
        { name: "Politique financière", count: 1 },
        { name: "Soutien à la haute direction", count: 1 },
        { name: "Statistiques", count: 1 },
        { name: "Travail administratif", count: 1 },
      ]);
      expect(console.log).not.toHaveBeenCalled();

      done();
    });

    test("should throw validation error without language query param - 422", async (done) => {
      const res = await request(mockedApp).get(path);

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      console.log.mockClear();

      done();
    });

    test("should throw validation error invalid language query param - 422", async (done) => {
      const res = await request(mockedApp).get(`${path}?language=asdasasf`);

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();

      console.log.mockClear();

      done();
    });

    test("should trigger error if there's a database problem - 500", async (done) => {
      prisma.skill.findMany.mockRejectedValue(new Error());
      const res = await request(mockedApp).get(`${path}?language=ENGLISH`);

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Error getting the top five skills");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.skill.findMany).toHaveBeenCalled();

      prisma.skill.findMany.mockClear();
      console.log.mockClear();

      done();
    });
  });
});
