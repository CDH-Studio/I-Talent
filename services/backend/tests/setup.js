const { mockKeycloak, mockPrisma } = require("./mocks");

console.log = jest.fn();

global.app = require("../src/server");

mockKeycloak();
global.mockedKeycloakApp = require("../src/server");

mockPrisma();
global.mockedPrismaApp = require("../src/server");
