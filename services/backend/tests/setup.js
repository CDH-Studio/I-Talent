const { mockKeycloak, mockPrisma } = require("./mocks");
const { PrismaClient } = require("../src/database/client");
const config = require("../src/config");

global.prisma = new PrismaClient({
  datasources: config.TEST_DATABASE_URL,
});

console.log = jest.fn();

global.app = require("../src/server");

mockKeycloak();
global.mockedKeycloakApp = require("../src/server");

mockPrisma();
global.mockedPrismaApp = require("../src/server");
