const request = require("supertest");
const axios = require("axios");
const { getBearerToken } = require("../../../mocks");
const config = require("../../../../src/config");

const path = "/api/keycloak/users";

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

  describe("when not authorised", () => {
    test("should not process request when user has incorrect keycloak role - 403", async () => {
      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken(["role"]));

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("Access denied");
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe("when authenticated", () => {
    describe("when doing a normal query", () => {
      let res;

      beforeAll(async () => {
        axios
          .mockReturnValueOnce({ data: { access_token: "ACCEESS_TOKEN" } })
          .mockReturnValueOnce({
            data: [
              {
                subGroups: [
                  { id: "group1", name: "italent-admin" },
                  { id: "group2", name: "italent-manager" },
                  { id: "group3", name: "italent-new-group" },
                ],
              },
            ],
          })
          .mockReturnValueOnce({
            data: [{ id: "user1" }, { id: "user3" }, { id: "user5" }],
          })
          .mockReturnValueOnce({
            data: [{ id: "user2" }, { id: "user4" }],
          })
          .mockReturnValueOnce({
            data: [{ id: "user6" }],
          });

        res = await request(app)
          .get(path)
          .set("Authorization", getBearerToken(["view-admin-console"]));
      });

      afterAll(() => {
        axios.mockReset();
      });

      test("should process request - 200", () => {
        expect(res.statusCode).toBe(200);
        expect(console.log).not.toHaveBeenCalled();
      });

      test("should call prisma with specified params", () => {
        expect(axios).toHaveBeenCalledWith({
          method: "post",
          baseURL: config.KEYCLOAK_AUTH_SERVER_URL,
          url: "/realms/individual/protocol/openid-connect/token",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: expect.any(String),
          timeout: 2000,
        });

        expect(axios).toHaveBeenCalledWith({
          method: "get",
          baseURL: config.KEYCLOAK_AUTH_SERVER_URL,
          url: "/admin/realms/individual/groups?search=upskill",
          headers: {
            Authorization: "Bearer ACCEESS_TOKEN",
          },
          timeout: 2000,
        });

        expect(axios).toHaveBeenCalledWith({
          method: "get",
          baseURL: config.KEYCLOAK_AUTH_SERVER_URL,
          url: "/admin/realms/individual/groups/group1/members",
          headers: {
            Authorization: "Bearer ACCEESS_TOKEN",
          },
          timeout: 2000,
        });

        expect(axios).toHaveBeenCalledWith({
          method: "get",
          baseURL: config.KEYCLOAK_AUTH_SERVER_URL,
          url: "/admin/realms/individual/groups/group2/members",
          headers: {
            Authorization: "Bearer ACCEESS_TOKEN",
          },
          timeout: 2000,
        });

        expect(axios).toHaveBeenCalledWith({
          method: "get",
          baseURL: config.KEYCLOAK_AUTH_SERVER_URL,
          url: "/admin/realms/individual/groups/group3/members",
          headers: {
            Authorization: "Bearer ACCEESS_TOKEN",
          },
          timeout: 2000,
        });
      });

      test("should return expected result", () => {
        expect(res.body).toStrictEqual({
          admin: ["user1", "user3", "user5"],
          manager: ["user2", "user4"],
          "italent-new-group": ["user6"],
        });
      });
    });

    test("should trigger error if there's an axios problem - 500", async () => {
      axios.mockRejectedValue(new Error());

      const res = await request(app)
        .get(path)
        .set("Authorization", getBearerToken(["view-admin-console"]));

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe("Internal Server Error");
      expect(console.log).toHaveBeenCalled();
      expect(axios).toHaveBeenCalled();

      axios.mockReset();
    });
  });
});
