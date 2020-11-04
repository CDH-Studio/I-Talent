const { keycloakMock, prismaMock } = require("./mocks");

console.log = jest.fn();

global.app = require("../src/server");

jest.resetModules();
jest.mock("redis", () => require("redis-mock"));
keycloakMock();
prismaMock();
global.prisma = require("../src/database");
global.mockedApp = require("../src/server");
