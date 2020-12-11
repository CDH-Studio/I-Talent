const keycloak = require("../../../src/utils/keycloak");

const hasResourceData = [
  ["viewPrivateProfile", "view-private-profile"],
  ["viewAdminConsole", "view-admin-console"],
  ["manageUsers", "manage-users"],
  ["manageOptions", "manage-options"],
];

describe("Utils keycloak tests", () => {
  beforeEach(() => console.log.mockReset());

  describe.each(hasResourceData)("%s", (keycloakFunction, role) => {
    test("returns false if the access token only has some content (hasContent)", () => {
      const data = { kauth: { grant: { access_token: { content: {} } } } };
      const result = keycloak[keycloakFunction](data);

      expect(result).toBeFalsy();
    });

    test("returns false if the access token only has the specified resource (hasResource)", () => {
      const data = {
        kauth: {
          grant: {
            access_token: { content: { resource_access: { testId: {} } } },
          },
        },
      };

      const result = keycloak[keycloakFunction](data);

      expect(result).toBeFalsy();
    });

    test(`returns true if the request is well formatted (${keycloakFunction})`, () => {
      const data = {
        kauth: {
          grant: {
            access_token: {
              content: {
                resource_access: { testId: { roles: [role] } },
              },
            },
          },
        },
      };

      const result = keycloak[keycloakFunction](data);

      expect(result).toEqual(true);
    });
  });

  describe("getKeycloakUserId", () => {
    test("returns false if the request has some content but no sub", () => {
      const data = { kauth: { grant: { access_token: { content: {} } } } };
      const result = keycloak.getKeycloakUserId(data);

      expect(result).toBeFalsy();
    });

    test("returns the keycloak id if the request has content and sub", () => {
      const data = {
        kauth: { grant: { access_token: { content: { sub: "myID" } } } },
      };
      const result = keycloak.getKeycloakUserId(data);

      expect(result).toEqual("myID");
    });
  });

  describe("isKeycloakUser", () => {
    test("returns false if the id is not present", () => {
      const result = keycloak.isKeycloakUser({});

      expect(result).toEqual(false);
    });

    test("returns false if the request has some content but no sub", () => {
      const data = { kauth: { grant: { access_token: { content: {} } } } };
      const result = keycloak.isKeycloakUser(data, "");

      expect(result).toBeFalsy();
    });

    test("returns false if the request has content and sub, but incorrect id", () => {
      const data = {
        kauth: { grant: { access_token: { content: { sub: "" } } } },
      };
      const result = keycloak.isKeycloakUser(data, "myID");

      expect(result).toBeFalsy();
    });

    test("returns true if the request has content and sub with correct id", () => {
      const data = {
        kauth: { grant: { access_token: { content: { sub: "myID" } } } },
      };
      const result = keycloak.isKeycloakUser(data, "myID");

      expect(result).toEqual(true);
    });
  });
});
