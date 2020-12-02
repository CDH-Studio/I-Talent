const KeycloakMock = require("keycloak-mock");

const keycloakMock = async () => {
  await KeycloakMock.createMockInstance({
    authServerURL: "https://myserver.com/auth",
    realm: "individual",
    clientID: "testId",
    clientSecret: "randomSecret",
  });
};

module.exports = {
  keycloakMock,
};
