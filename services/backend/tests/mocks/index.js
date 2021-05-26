/* eslint-disable global-require */
const faker = require("faker");
const KeycloakMock = require("keycloak-mock");
const config = require("../../src/config");
const keycloakUtils = require("../../src/utils/keycloak");

const userId = faker.datatype.uuid();

const isKeycloakUserSpy = jest.spyOn(keycloakUtils, "isKeycloakUser");

const keycloakMock = async () => {
  const keycloak = await KeycloakMock.createMockInstance({
    authServerURL: config.KEYCLOAK_AUTH_SERVER_URL,
    realm: "individual",
    clientID: config.KEYCLOAK_CLIENT_ID,
    clientSecret: config.KEYCLOAK_SECRET,
  });

  KeycloakMock.activateMock(keycloak);

  keycloak.database.createUser({
    id: userId,
    email: faker.internet.email(),
    username: faker.internet.userName(),
  });
};

const getBearerToken = (roles) => {
  const keycloak = KeycloakMock.getMockInstance(
    config.KEYCLOAK_AUTH_SERVER_URL
  );

  const bearerToken = keycloak.createBearerToken(userId, 3600, { roles });

  return `Bearer ${bearerToken}`;
};

const prismaMock = () => {
  jest.mock("../../src/database");
};

const axiosMock = () => {
  jest.mock("axios");
};

const redisMock = () => {
  jest.mock("redis", () => require("redis-mock"));
};

module.exports = {
  keycloakMock,
  isKeycloakUserSpy,
  prismaMock,
  redisMock,
  axiosMock,
  getBearerToken,
  userId,
};
