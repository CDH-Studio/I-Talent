import { mockKeycloak, mockPrisma } from "./mocks";
import { PrismaClient } from "../src/database/client";

global.prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

console.log = jest.fn();

global.app = require("../src/server").app;

mockKeycloak();
global.mockedKeycloakApp = require("../src/server").app;

mockPrisma();
global.mockedPrismaApp = require("../src/server").app;
