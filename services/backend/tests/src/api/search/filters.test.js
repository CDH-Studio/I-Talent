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

    describe("when doing a normal queries", () => {
      describe("Testing Name Filter", () => {
        afterEach(() => {
          prisma.user.findMany.mockReset();
          prisma.user.findOne.mockReset();
        });

        test("no results found - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = "zzzzzzzzzz";

          let res = await request(app)
            .get(`${path}?name=${searchTerm}&language=ENGLISH`)
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(200);
          expect(res.text).toBe("[]");
        });

        test("Results found - 200", async () => {
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

      describe("Testing Classification Filter", () => {
        afterEach(() => {
          prisma.user.findMany.mockReset();
          prisma.user.findOne.mockReset();
        });

        test("No results found - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = "zzzzzzzzzz";

          let res = await request(app)
            .get(`${path}?classifications[]=${searchTerm}&language=ENGLISH`)
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(200);
          expect(res.text).toBe("[]");
        });

        test("Results found - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = _testData.testParams.filterSearch[1].testSearchTerm;

          let res = await request(app)
            .get(`${path}?classifications[]=${searchTerm}&language=ENGLISH`)
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(
            _testData.testParams.filterSearch[1].testResponseCode
          );
          expect(res.text).toBe(
            _testData.testParams.filterSearch[1].testResponseData
          );
        });
      });

      describe("Testing Location Filter", () => {
        afterEach(() => {
          prisma.user.findMany.mockReset();
          prisma.user.findOne.mockReset();
        });

        test("No results found - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = "zzzzzzzzzz";

          let res = await request(app)
            .get(`${path}?locations[]=${searchTerm}&language=ENGLISH`)
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(200);
          expect(res.text).toBe("[]");
        });

        test("Results found - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = _testData.testParams.filterSearch[2].testSearchTerm;

          let res = await request(app)
            .get(`${path}?locations[]=${searchTerm}&language=ENGLISH`)
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(
            _testData.testParams.filterSearch[2].testResponseCode
          );
          expect(res.text).toBe(
            _testData.testParams.filterSearch[2].testResponseData
          );
        });
      });

      describe("Testing Skills Filter", () => {
        afterEach(() => {
          prisma.user.findMany.mockReset();
          prisma.user.findOne.mockReset();
        });

        test("No results found - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = "zzzzzzzzzz";

          let res = await request(app)
            .get(`${path}?skills[]=${searchTerm}&language=ENGLISH`)
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(200);
          expect(res.text).toBe("[]");
        });

        test("Results found - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = _testData.testParams.filterSearch[3].testSearchTerm;

          let res = await request(app)
            .get(
              `${path}?skills[]=${searchTerm[0]}&skills[]=${searchTerm[1]}&language=ENGLISH`
            )
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(
            _testData.testParams.filterSearch[3].testResponseCode
          );
          expect(res.text).toBe(
            _testData.testParams.filterSearch[3].testResponseData
          );
        });
      });

      describe("Testing Mentorship Skills Filter", () => {
        afterEach(() => {
          prisma.user.findMany.mockReset();
          prisma.user.findOne.mockReset();
        });

        test("No results found - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = "zzzzzzzzzz";

          let res = await request(app)
            .get(`${path}?skills[]=${searchTerm}&language=ENGLISH`)
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(200);
          expect(res.text).toBe("[]");
        });

        test("Results found - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = _testData.testParams.filterSearch[4].testSearchTerm;

          let res = await request(app)
            .get(`${path}?mentorSkills[]=${searchTerm[0]}&language=ENGLISH`)
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(
            _testData.testParams.filterSearch[4].testResponseCode
          );
          expect(res.text).toBe(
            _testData.testParams.filterSearch[4].testResponseData
          );
        });
      });

      describe("Testing Any Mentorship Skills Filter", () => {
        afterEach(() => {
          prisma.user.findMany.mockReset();
          prisma.user.findOne.mockReset();
        });

        test("Results found (Any Mentorship Skills = true) - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = _testData.testParams.filterSearch[5].testSearchTerm;

          let res = await request(app)
            .get(`${path}?anyMentorSkills=${searchTerm}&language=ENGLISH`)
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(
            _testData.testParams.filterSearch[5].testResponseCode
          );
          expect(res.text).toBe(
            _testData.testParams.filterSearch[5].testResponseData
          );
        });

        test("Results found (Any Mentorship Skills = false) - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = _testData.testParams.filterSearch[6].testSearchTerm;

          let res = await request(app)
            .get(`${path}?anyMentorSkills=${searchTerm}&language=ENGLISH`)
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(
            _testData.testParams.filterSearch[6].testResponseCode
          );
          expect(res.text).toBe(
            _testData.testParams.filterSearch[6].testResponseData
          );
        });

        test("Results found (Any Mentorship Skills = zzzzzzz) - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = _testData.testParams.filterSearch[7].testSearchTerm;

          let res = await request(app)
            .get(`${path}?anyMentorSkills=${searchTerm}&language=ENGLISH`)
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(
            _testData.testParams.filterSearch[7].testResponseCode
          );
          expect(res.text).toBe(
            _testData.testParams.filterSearch[7].testResponseData
          );
        });
      });

      describe("Testing ExFeeder Filter", () => {
        afterEach(() => {
          prisma.user.findMany.mockReset();
          prisma.user.findOne.mockReset();
        });

        test("Results found (ExFeeder = true) - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = _testData.testParams.filterSearch[8].testSearchTerm;

          let res = await request(app)
            .get(`${path}?exFeeder=${searchTerm}&language=ENGLISH`)
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(
            _testData.testParams.filterSearch[8].testResponseCode
          );
          expect(res.text).toBe(
            _testData.testParams.filterSearch[8].testResponseData
          );
        });

        test("Results found (ExFeeder = false) - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = _testData.testParams.filterSearch[9].testSearchTerm;

          let res = await request(app)
            .get(`${path}?exFeeder=${searchTerm}&language=ENGLISH`)
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(
            _testData.testParams.filterSearch[9].testResponseCode
          );
          expect(res.text).toBe(
            _testData.testParams.filterSearch[9].testResponseData
          );
        });

        test("Results found (ExFeeder = zzzzzzz) - 200", async () => {
          let _testData = JSON.parse(JSON.stringify(testData));

          prisma.user.findMany.mockResolvedValue(_testData.allProfiles);
          prisma.user.findOne
            .mockResolvedValueOnce(_testData.allProfilesInfo[0])
            .mockResolvedValueOnce(_testData.allProfilesInfo[1]);

          let searchTerm = _testData.testParams.filterSearch[10].testSearchTerm;

          let res = await request(app)
            .get(`${path}?exFeeder=${searchTerm}&language=ENGLISH`)
            .set("Authorization", getBearerToken());

          expect(res.statusCode).toBe(
            _testData.testParams.filterSearch[10].testResponseCode
          );
          expect(res.text).toBe(
            _testData.testParams.filterSearch[10].testResponseData
          );
        });
      });
    });
  });
});
