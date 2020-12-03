/* eslint-disable global-require */
const { redisMock, keycloakMock, prismaMock, axiosMock } = require("./mocks");

console.log = jest.fn();

redisMock();
keycloakMock();
prismaMock();
axiosMock();

global.app = require("../src/server");
global.prisma = require("../src/database");
