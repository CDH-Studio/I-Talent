/* eslint-disable global-require */
const { redisMock, keycloakMock, prismaMock } = require("./mocks");

console.log = jest.fn();

redisMock();
keycloakMock();
prismaMock();

global.app = require("../src/server");
global.prisma = require("../src/database");
