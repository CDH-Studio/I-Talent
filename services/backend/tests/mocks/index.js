/* eslint-disable global-require */
import { random, internet } from "faker";
import {
  createMockInstance,
  activateMock,
  getMockInstance,
} from "keycloak-mock";
import {
  KEYCLOAK_AUTH_SERVER_URL,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_SECRET,
} from "../../src/config";

const userId = random.uuid();

const keycloakMock = async () => {
  const keycloak = await createMockInstance({
    authServerURL: KEYCLOAK_AUTH_SERVER_URL,
    realm: "individual",
    clientID: KEYCLOAK_CLIENT_ID,
    clientSecret: KEYCLOAK_SECRET,
  });

  activateMock(keycloak);

  keycloak.database.createUser({
    id: userId,
    email: internet.email(),
    username: internet.userName(),
  });
};

const getBearerToken = (roles) => {
  const keycloak = getMockInstance(KEYCLOAK_AUTH_SERVER_URL);

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

export default {
  keycloakMock,
  prismaMock,
  redisMock,
  axiosMock,
  getBearerToken,
  userId,
};
