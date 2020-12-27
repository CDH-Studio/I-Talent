const request = require("supertest");
const { getBearerToken } = require("../../../mocks");

const path = "/api/search/filters";
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
        .get(path)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });

    test("should throw validation error invalid language query param - 422", async () => {
      const res = await request(app)
        .get(`${path}?language=ijoij`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
    });

    describe("when doing a normal query", () => {
      afterEach(() => {
        prisma.user.findMany.mockReset();
        prisma.user.findOne.mockReset();
      });

      test("should return results for using 'Name' filter - 200", async () => {
        let _testData = JSON.parse(JSON.stringify(testData));

        prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
        prisma.user.findOne
          .mockResolvedValueOnce(_testData.allProfilesInfo[0])
          .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

        let searchTerm = _testData.testParams.filterSearch[0].testSearchTerm;

        let res = await request(app)
          .get(`${path}?name=${searchTerm}&language=ENGLISH`)
          .set("Authorization", getBearerToken());

        expect(res.statusCode).toBe(
          _testData.testParams.filterSearch[0].testResponseCode
        );
        expect(res.text).toBe(
          _testData.testParams.filterSearch[0].testResponseData
        );
      });

      test("should return results for using 'Classification' filter - 200", async () => {
        let _testData = JSON.parse(JSON.stringify(testData));

        prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
        prisma.user.findOne
          .mockResolvedValueOnce(_testData.allProfilesInfo[0])
          .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

        let searchTerm = _testData.testParams.filterSearch[0].testSearchTerm;

        let res = await request(app)
          .get(`${path}?name=${searchTerm}&language=ENGLISH`)
          .set("Authorization", getBearerToken());

        expect(res.statusCode).toBe(
          _testData.testParams.filterSearch[0].testResponseCode
        );
        expect(res.text).toBe(
          _testData.testParams.filterSearch[0].testResponseData
        );
      });
    });
  });
});
