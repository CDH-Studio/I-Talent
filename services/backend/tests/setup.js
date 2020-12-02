/* eslint-disable global-require */
const { mock } = require("./mocks");

(async () => {
  await mock();
  global.app = require("../src/server");
  global.prisma = require("../src/database");
})();
