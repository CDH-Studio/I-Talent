const request = require("supertest");
const faker = require("faker");
const axios = require("axios");
const { getBearerToken, userId } = require("../../../mocks");
const config = require("../../../../src/config");

const path = "/api/profGen";

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
    describe("when doing a normal query", () => {
      test.todo("COVER EDGE CASES");

      const prismaUserData = {
        email: "test@test.com",
      };
      const prismaLocationData = [
        {
          id: 123,
          city: "Ottawa",
        },
      ];
      const axiosData = [
        {
          givenName: "John",
          surname: "Doe",
          contactInformation: {
            email: "test@test.com",
            phoneNumber: "6132940534",
            altPhoneNumber: "6138620511",
          },
          organizationInformation: {
            organization: {
              id: "id org1",
              description: { en: "org1EN", fr: "org1FR" },
              addressInformation: {
                pc: "ASDASD",
                country: { en: "Canada" },
                city: { en: "Ottawa" },
                address: { en: "123 street" },
              },
              organizationInformation: {
                organization: {
                  id: "id org2",
                  description: { en: "org2EN", fr: "org2FR" },
                  addressInformation: {},
                  organizationInformation: {
                    organization: {
                      id: "id org3",
                      description: { en: "org3EN", fr: "org3FR" },
                      addressInformation: {},
                    },
                  },
                },
              },
            },
          },
          title: {
            en: "title",
            fr: "titre",
          },
        },
      ];

      let res;

      beforeAll(async () => {
        prisma.user.findOne.mockResolvedValue(prismaUserData);
        axios.mockResolvedValue({ data: axiosData });
        prisma.opOfficeLocation.findMany.mockResolvedValue(prismaLocationData);

        res = await request(app)
          .get(`${path}?email=test@test.com`)
          .set("Authorization", getBearerToken());
      });

      afterAll(() => {
        prisma.user.findOne.mockReset();
        axios.mockReset();
        prisma.opOfficeLocation.findMany.mockReset();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(prisma.user.findOne).toHaveBeenCalledWith({
          where: { id: userId },
          select: { email: true },
        });

        expect(prisma.opOfficeLocation.findMany).toHaveBeenCalledWith({
          where: {
            country: "Canada",
            city: "Ottawa",
            postalCode: "ASDASD",
            streetNumber: 123,
          },
          select: {
            id: true,
            city: true,
          },
        });
      });

      test("should call axios with specified params", () => {
        expect(axios).toHaveBeenCalledWith({
          method: "get",
          url: expect.any(String),
          headers: {
            "user-key": config.GEDSAPIKEY,
            Accept: "application/json",
          },
          timeout: 5000,
        });
      });

      test("should return expected result", () => {
        expect(res.body).toStrictEqual({
          firstName: "John",
          lastName: "Doe",
          locationId: 123,
          locationName: "123 street, Ottawa",
          email: "test@test.com",
          branch: {
            ENGLISH: "org1EN",
            FRENCH: "org1FR",
          },
          telephone: "6132940534",
          cellphone: "6138620511",
          jobTitle: {
            ENGLISH: "title",
            FRENCH: "titre",
          },
          organizations: [
            [
              {
                title: { ENGLISH: "org3EN", FRENCH: "org3FR" },
                id: "id org3",
                tier: 2,
              },
              {
                title: { ENGLISH: "org2EN", FRENCH: "org2FR" },
                id: "id org2",
                tier: 1,
              },
              {
                title: { ENGLISH: "org1EN", FRENCH: "org1FR" },
                id: "id org1",
                tier: 0,
              },
            ],
          ],
        });
      });
    });

    test("should trigger error if user does not exist in db - 500", async () => {
      axios.mockResolvedValue({ data: [] });
      prisma.user.findOne.mockResolvedValue(undefined);

      const res = await request(app)
        .get(`${path}?email=${faker.internet.email()}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.findOne).toHaveBeenCalled();
      expect(axios).toHaveBeenCalled();

      axios.mockReset();
      prisma.user.findOne.mockReset();
    });

    test("should trigger error if GEDS API returns an empty array - 500", async () => {
      axios.mockResolvedValue({ data: [] });
      prisma.user.findOne.mockResolvedValue({ email: "" });

      const res = await request(app)
        .get(`${path}?email=${faker.internet.email()}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.findOne).toHaveBeenCalled();
      expect(axios).toHaveBeenCalled();

      axios.mockReset();
      prisma.user.findOne.mockReset();
    });

    test("should trigger error if there's a database problem - 500", async () => {
      axios.mockResolvedValue({ data: [] });
      prisma.user.findOne.mockRejectedValue(new Error());

      const res = await request(app)
        .get(`${path}?email=${faker.internet.email()}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.findOne).toHaveBeenCalled();
      expect(axios).toHaveBeenCalled();

      axios.mockReset();
      prisma.user.findOne.mockReset();
    });

    test("should trigger error if there's an axios problem - 500", async () => {
      axios.mockRejectedValue(new Error());
      prisma.user.findOne.mockResolvedValue({ email: "" });

      const res = await request(app)
        .get(`${path}?email=${faker.internet.email()}`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.findOne).toHaveBeenCalled();
      expect(axios).toHaveBeenCalled();

      axios.mockReset();
      prisma.user.findOne.mockReset();
    });

    test("should throw validation error if email is not valid - 422", async () => {
      const res = await request(app)
        .get(`${path}?email=notarealemail`)
        .set("Authorization", getBearerToken());

      expect(res.statusCode).toBe(422);
      expect(console.log).toHaveBeenCalled();
      expect(prisma.user.findOne).not.toHaveBeenCalled();
    });
  });
});
