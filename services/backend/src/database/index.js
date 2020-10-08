/* eslint-disable */
const { PrismaClient } = require("./client");
const config = require("../config");

/**
 * @type PrismaClient
 */
let prisma;

// Was hitting the psql db max client https://github.com/prisma/prisma-client-js/issues/228#issuecomment-618433162
// And is easier for testing (uses one prisma client instead of multiple ones)
if (config.ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

module.exports = prisma;
