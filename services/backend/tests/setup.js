const { mockKeycloak, mockPrisma } = require("./mocks");
const { PrismaClient } = require("../src/database/client");

global.prisma = new PrismaClient({
  datasources: process.env.TEST_DATABASE_URL,
});

console.log = jest.fn();

global.app = require("../src/server");

mockKeycloak();
global.mockedKeycloakApp = require("../src/server");

mockPrisma();
global.mockedPrismaApp = require("../src/server");
