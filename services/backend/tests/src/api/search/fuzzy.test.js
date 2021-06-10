const request = require("supertest");
const { getBearerToken, userId } = require("../../../mocks");

const path = "/api/search/fuzzy";
const testData = require("./allProfileData.json");

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
    test("should throw validation error without language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?searchValue=abc`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=abc`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });

    test("should throw validation error without searchValue query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=FRENCH`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });

    describe("when doing a normal query", () => {
      afterEach(() => {
        prisma.user.findMany.mockReset();
        prisma.user.findUnique.mockReset();
      });

      test("should return results for search term 'a' - 200", async () => {
        let _testData = JSON.parse(JSON.stringify(testData));

        prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
        prisma.user.findUnique
          .mockResolvedValueOnce(_testData.allProfilesInfo[0])
          .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

        let searchTerm = _testData.testParams.fuzzySearch[0].testSearchTerm;

        let res = await request(app)
          .get(`${path}?searchValue=${searchTerm}&language=ENGLISH`)
          .set("Authorization", getBearerToken());

        expect(res.statusCode).toBe(
          _testData.testParams.fuzzySearch[0].testResponseCode
        );
        expect(res.text).toBe(
          _testData.testParams.fuzzySearch[0].testResponseData
        );
      });

      test("should return results for branch acronym 'HRB' - 200", async () => {
        let _testData = JSON.parse(JSON.stringify(testData));

        prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
        prisma.user.findUnique
          .mockResolvedValueOnce(_testData.allProfilesInfo[0])
          .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

        let searchTerm = _testData.testParams.fuzzySearch[1].testSearchTerm;

        let res = await request(app)
          .get(`${path}?searchValue=${searchTerm}&language=ENGLISH`)
          .set("Authorization", getBearerToken());

        expect(res.statusCode).toBe(
          _testData.testParams.fuzzySearch[1].testResponseCode
        );
        expect(res.text).toBe(
          _testData.testParams.fuzzySearch[1].testResponseData
        );
      });

      test("should return results for full name 'John Doe' - 200", async () => {
        let _testData = JSON.parse(JSON.stringify(testData));

        prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
        prisma.user.findUnique
          .mockResolvedValueOnce(_testData.allProfilesInfo[0])
          .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

        let searchTerm = _testData.testParams.fuzzySearch[2].testSearchTerm;

        let res = await request(app)
          .get(`${path}?searchValue=${searchTerm}&language=ENGLISH`)
          .set("Authorization", getBearerToken());

        expect(res.statusCode).toBe(
          _testData.testParams.fuzzySearch[2].testResponseCode
        );
        expect(res.text).toBe(
          _testData.testParams.fuzzySearch[2].testResponseData
        );
      });

      test("should return results for advanced search OR function 'Mary | John' - 200", async () => {
        let _testData = JSON.parse(JSON.stringify(testData));

        prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
        prisma.user.findUnique
          .mockResolvedValueOnce(_testData.allProfilesInfo[0])
          .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

        let searchTerm = _testData.testParams.fuzzySearch[3].testSearchTerm;

        let res = await request(app)
          .get(`${path}?searchValue=${searchTerm}&language=ENGLISH`)
          .set("Authorization", getBearerToken());

        expect(res.statusCode).toBe(
          _testData.testParams.fuzzySearch[3].testResponseCode
        );
        expect(res.text).toBe(
          _testData.testParams.fuzzySearch[3].testResponseData
        );
      });

      test("should return results for searching 'exfeeder' - 200", async () => {
        let _testData = JSON.parse(JSON.stringify(testData));

        prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
        prisma.user.findUnique
          .mockResolvedValueOnce(_testData.allProfilesInfo[0])
          .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

        let searchTerm = _testData.testParams.fuzzySearch[3].testSearchTerm;

        let res = await request(app)
          .get(`${path}?searchValue=${searchTerm}&language=ENGLISH`)
          .set("Authorization", getBearerToken());

        expect(res.statusCode).toBe(
          _testData.testParams.fuzzySearch[3].testResponseCode
        );
        expect(res.text).toBe(
          _testData.testParams.fuzzySearch[3].testResponseData
        );
      });
    });
  });
});
