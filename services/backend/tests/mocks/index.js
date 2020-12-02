const { keycloakMock } = require("./keycloak");
const { prismaMock } = require("./prisma");
const { redisMock } = require("./redis");

const mock = async () => {
  console.log = jest.fn();

  redisMock();
  await keycloakMock();
  prismaMock();
};

module.exports = {
  mock,
};
