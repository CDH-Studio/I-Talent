const { keycloakMock } = require("./keycloak");
const { prismaMock } = require("./prisma");

const unMock = () => {
  jest.resetModules();
  jest.unmock("../src/auth/keycloak").unmock("../src/database");
};

module.exports = {
  keycloakMock,
  prismaMock,
  unMock,
};
