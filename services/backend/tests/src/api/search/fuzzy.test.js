const request = require("supertest");
const { getBearerToken, userId } = require("../../../mocks");

const path = "/api/search/fuzzy";
// const testData = "allProfileData.json";
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
      // beforeEach(() => {
      //   prisma.user.findMany.mockResolvedValue(testData.allProfiles);
      //   prisma.user.findOne
      //     .mockResolvedValueOnce(testData.allProfilesInfo[0])
      //     .mockResolvedValueOnce(testData.allProfilesInfo[1]);
      //   console.warn("before", prisma.user.findOne.mock.calls.length);
      // });

      // afterEach(() => {
      //   console.warn("after1", prisma.user.findOne.mock.calls.length);
      //   prisma.user.findMany.mockReset();
      //   prisma.user.findOne.mockReset();
      //   console.log.mockReset();
      //   console.warn("after2", prisma.user.findOne.mock.calls.length);
      //   // prisma.user.findOne.mockReset();
      // });

      test("should return results for search term 'a' - 200", async () => {
        prisma.user.findMany.mockResolvedValue(testData.allProfiles);
        prisma.user.findOne
          .mockResolvedValueOnce(testData.allProfilesInfo[0])
          .mockResolvedValueOnce(testData.allProfilesInfo[1]);

        let searchTerm = testData.testParams[0].testSearchTerm;

        let res = await request(app)
          .get(`${path}?searchValue=${searchTerm}&language=ENGLISH`)
          .set("Authorization", getBearerToken());

        expect(res.statusCode).toBe(testData.testParams[0].testResponseCode);
        expect(res.text).toBe(testData.testParams[0].testResponseData);
        //expect(console.log).not.toHaveBeenCalled();

        prisma.user.findMany.mockReset();
        prisma.user.findOne.mockReset();
        jest.clearAllMocks();
      });

      test("should return results for branch acronym 'HRB' - 200", async () => {
        console.warn("before", prisma.user.findMany.mock.calls.length);
        console.warn("before", prisma.user.findOne.mock.calls.length);

        prisma.user.findMany.mockResolvedValue(testData.allProfiles);
        prisma.user.findOne
          .mockResolvedValueOnce(testData.allProfilesInfo[0])
          .mockResolvedValueOnce(testData.allProfilesInfo[1]);

        let searchTerm = testData.testParams[1].testSearchTerm;
        console.warn(searchTerm);

        let res = await request(app)
          .get(`${path}?searchValue=${searchTerm}&language=ENGLISH`)
          .set("Authorization", getBearerToken());

        // console.warn(res);

        expect(res.statusCode).toBe(testData.testParams[1].testResponseCode);
        expect(res.text).toBe(testData.testParams[1].testResponseData);
        //expect(console.log).not.toHaveBeenCalled();

        prisma.user.findMany.mockReset();
        prisma.user.findOne.mockReset();
        jest.clearAllMocks();
      });
    });

    // test("should respond with object of search results - 200", async () => {
    // describe("when using fuzzy search", () => {
    // const data = [
    //   [
    //     "when user exists in db",
    //     [
    //       {
    //         id: "25ba7914-1505-4806-97f9-e1c4b003ad92",
    //         visibleCards: {
    //           id: "b0b90ef0-644a-40da-89f7-8e8a486946fb",
    //           createdAt: "2020-12-14T17:25:19.962Z",
    //           updatedAt: "2020-12-14T17:25:19.966Z",
    //           info: "PUBLIC",
    //           talentManagement: "PUBLIC",
    //           officialLanguage: "PUBLIC",
    //           skills: "PUBLIC",
    //           competencies: "PUBLIC",
    //           developmentalGoals: "PUBLIC",
    //           qualifiedPools: "PRIVATE",
    //           description: "PRIVATE",
    //           education: "PUBLIC",
    //           experience: "PUBLIC",
    //           careerInterests: "PUBLIC",
    //           mentorshipSkills: "PUBLIC",
    //           exFeeder: "PUBLIC",
    //           employmentEquityGroup: "PRIVATE",
    //         },
    //         connections: [],
    //       },
    //     ],

    //     {
    //       id: "25ba7914-1505-4806-97f9-e1c4b003ad92",
    //       firstName: "John",
    //       lastName: "Doe",
    //       telephone: "713-123-4567",
    //       cellphone: "613-987-6543",
    //       manager: "Chahine El Chaar",
    //       teams: ["CDH Studio", "I-talent"],
    //       status: "ACTIVE",
    //       email: "john.doe@canada.ca",
    //       exFeeder: false,
    //       avatarColor: "#0bdaa3",
    //       tenure: {
    //         id: "045603ae-e05e-41c6-a91e-9f606c1a575f",
    //         translations: [{ name: "Indeterminate" }],
    //       },
    //       groupLevel: {
    //         id: "d78f0859-84af-4e46-884f-b15510e0b273",
    //         name: "AS 04",
    //       },
    //       actingLevel: {
    //         id: "33cba2d3-5336-47e3-b650-3eed1999df45",
    //         name: "CS 03",
    //       },
    //       employmentInfo: {
    //         translations: [
    //           {
    //             branch: "Chief Information Office",
    //             jobTitle: "Data Scientist",
    //           },
    //         ],
    //       },
    //       officeLocation: {
    //         id: "282952e2-787a-4ee9-8b0e-234776f21673",
    //         city: "Ottawa",
    //         streetNumber: 235,
    //         translations: [{ province: "Ontario", streetName: "Queen St" }],
    //       },
    //       experiences: [
    //         {
    //           startDate: "2010-12-14T17:25:16.082Z",
    //           endDate: "2014-12-14T17:25:16.082Z",
    //           projects: [
    //             "Landscaping backyard",
    //             "Calculator prediction mobile application",
    //             "Government of Canada global information database",
    //           ],
    //           translations: [
    //             {
    //               description:
    //                 "Livrer les project à temps et maintenir le contact avec les clients",
    //               jobTitle: "Gestionnaire de projet TI",
    //               organization: "Banque du Canada",
    //             },
    //           ],
    //         },
    //       ],
    //       educations: [],
    //       skills: [
    //         {
    //           skill: {
    //             id: "477d4291-fcbf-4c7a-b377-7fc160fafeff",
    //             translations: [{ name: "CGI" }],
    //           },
    //         },
    //         {
    //           skill: {
    //             id: "7c72c804-0a69-4783-aa11-c39b37230b30",
    //             translations: [{ name: "Linux" }],
    //           },
    //         },
    //       ],
    //       competencies: [
    //         {
    //           competency: {
    //             id: "d5cb2222-1278-4ff0-b175-d4320f258fd2",
    //             translations: [{ name: "Delegation" }],
    //           },
    //         },
    //         {
    //           competency: {
    //             id: "8b5377dc-d3a1-485d-a7c0-c10ee6ff742c",
    //             translations: [{ name: "Compassion" }],
    //           },
    //         },
    //       ],
    //       mentorshipSkills: [
    //         {
    //           id: "5a3bf983-9e63-4936-be1c-63505a6c8677",
    //           createdAt: "2020-12-14T17:25:19.964Z",
    //           updatedAt: "2020-12-14T17:25:19.966Z",
    //           userId: "25ba7914-1505-4806-97f9-e1c4b003ad92",
    //           skillId: "15a71d76-5110-4f66-890b-41f0284223e0",
    //         },
    //         {
    //           id: "fdba1b3a-62aa-4da9-8a5e-911e61c08e61",
    //           createdAt: "2020-12-14T17:25:19.964Z",
    //           updatedAt: "2020-12-14T17:25:19.966Z",
    //           userId: "25ba7914-1505-4806-97f9-e1c4b003ad92",
    //           skillId: "446f3914-7041-4f1e-9c65-e9bc0557f30f",
    //         },
    //       ],
    //       organizations: [],
    //       isConnection: false,
    //     },

    //     200,
    //     `[{\"id\":\"25ba7914-1505-4806-97f9-e1c4b003ad92\",\"avatarColor\":\"#0bdaa3\",\"firstName\":\"John\",\"lastName\":\"Doe\",\"isConnection\":false,\"jobTitle\":\"Data Scientist\",\"branch\":\"Chief Information Office\",\"officeLocation\":{\"id\":\"282952e2-787a-4ee9-8b0e-234776f21673\",\"city\":\"Ottawa\",\"streetNumber\":235,\"province\":\"Ontario\",\"streetName\":\"Queen St\",\"fullName\":\"235 Queen St\"},\"skills\":[{\"name\":\"Compassion\"},{\"name\":\"Delegation\"}],\"totalSkillsCount\":2,\"groupLevel\":{\"id\":\"d78f0859-84af-4e46-884f-b15510e0b273\",\"name\":\"AS 04\"},\"nameInitials\":\"JD\",\"status\":\"ACTIVE\",\"matches\":[{\"indices\":[[12,12]],\"value\":\"Chief Information Office\",\"key\":\"branch.name\"},{\"indices\":[[31,31],[47,47],[51,51]],\"value\":\"Livrer les project à temps et maintenir le contact avec les clients\",\"key\":\"experiences.description\",\"refIndex\":0},{\"indices\":[[8,8]],\"value\":\"Gestionnaire de projet TI\",\"key\":\"experiences.jobTitle\",\"refIndex\":0},{\"indices\":[[15,15],[17,17],[19,19],[25,25],[34,34],[41,41],[43,43],[45,45]],\"value\":\"Government of Canada global information database\",\"key\":\"experiences.projects\",\"refIndex\":2},{\"indices\":[[1,1],[6,6],[29,29],[35,35]],\"value\":\"Calculator prediction mobile application\",\"key\":\"experiences.projects\",\"refIndex\":1},{\"indices\":[[1,1],[6,6],[13,13],[17,17]],\"value\":\"Landscaping backyard\",\"key\":\"experiences.projects\",\"refIndex\":0},{\"indices\":[[1,1],[11,11],[13,13],[15,15]],\"value\":\"Banque du Canada\",\"key\":\"experiences.organization\",\"refIndex\":0},{\"indices\":[[0,0]],\"value\":\"AS 04\",\"key\":\"groupLevel.name\"},{\"indices\":[[4,4]],\"value\":\"Compassion\",\"key\":\"competencies.name\",\"refIndex\":1},{\"indices\":[[5,5]],\"value\":\"Delegation\",\"key\":\"competencies.name\",\"refIndex\":0},{\"indices\":[[10,10],[12,12],[14,14],[17,17]],\"value\":\"john.doe@canada.ca\",\"key\":\"email\"},{\"indices\":[[1,1],[3,3]],\"value\":\"Data Scientist\",\"key\":\"jobTitle\"},{\"indices\":[[3,3],[5,5]],\"value\":\"Ottawa\",\"key\":\"officeLocation.city\"},{\"indices\":[[3,3]],\"value\":\"Ontario\",\"key\":\"officeLocation.province\"},{\"indices\":[[2,2],[13,14]],\"value\":\"Chahine El Chaar\",\"key\":\"manager\"},{\"indices\":[[4,4]],\"value\":\"Compassion\",\"key\":\"skills.name\",\"refIndex\":3},{\"indices\":[[5,5]],\"value\":\"Delegation\",\"key\":\"skills.name\",\"refIndex\":2},{\"indices\":[[3,3]],\"value\":\"I-talent\",\"key\":\"teams\",\"refIndex\":1},{\"indices\":[[10,10]],\"value\":\"Indeterminate\",\"key\":\"tenure\"}]}]`,
    //   ],
    // ];

    //   describe.each(data)(
    //     "when %s",
    //     (
    //       _testLabel,
    //       prismaAllProfiles,
    //       prismaProfileInfo,
    //       statusCode,
    //       result
    //     ) => {
    //       let res;

    //       // beforeAll(async () => {
    //       //   //prisma.user.findMany.mockResolvedValue(prismaAllProfiles);
    //       //   //prisma.user.findOne.mockResolvedValue(prismaProfileInfo);
    //       //   //   .mockResolvedValueOnce(testData.allProfilesInfo[0])
    //       //   //   .mockResolvedValueOnce(testData.allProfilesInfo[1]);
    //       //   // // .mockResolvedValueOnce(testData.allProfilesInfo[0])
    //       //   // // .mockResolvedValueOnce(testData.allProfilesInfo[1]);
    //       //   prisma.user.findMany.mockResolvedValue(testData.allProfiles);
    //       //   prisma.user.findOne
    //       //     .mockResolvedValueOnce(testData.allProfilesInfo[0])
    //       //     .mockResolvedValueOnce(testData.allProfilesInfo[1]);
    //       // });

    //       // afterAll(() => {
    //       //   prisma.user.findMany.mockReset();
    //       //   prisma.user.findOne.mockReset();
    //       // });

    //       // test(testData.testParams[0].testTitle, async () => {
    //       //   res = await request(app)
    //       //     .get(`${path}?searchValue=a&language=ENGLISH`)
    //       //     .set("Authorization", getBearerToken());
    //       //   expect(res.statusCode).toBe(
    //       //     testData.testParams[0].testResponseCode
    //       //   );
    //       //   //expect(console.log).not.toHaveBeenCalled();
    //       // });

    //       // test("should return expected result with search term 'a'", async () => {
    //       //   res = await request(app)
    //       //     .get(`${path}?searchValue=a&language=ENGLISH`)
    //       //     .set("Authorization", getBearerToken());
    //       //   expect(res.text).toBe(testData.testParams[0].testResponseData);
    //       // });

    //       // test("should return expected result with search term 'a'", () => {
    //       //   res = await request(app)
    //       //     .get(`${path}?searchValue="John Doe"&language=ENGLISH`)
    //       //     .set("Authorization", getBearerToken());
    //       //   expect(res.text).toBe(result);
    //       // });
    //     }
    //   );
    // });
  });
});
