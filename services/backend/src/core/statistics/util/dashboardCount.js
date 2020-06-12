const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getHiddenUserCount(request, response) {
  try {
    const hiddenUserCount = await prisma.users.count({
      where: {
        status: "HIDDEN",
      },
    });

    response.status(200).json(hiddenUserCount);
  } catch (error) {
    response.status(500).send("Error getting hidden user count");
  }
}

async function getInactiveUserCount(request, response) {
  try {
    const inactiveUserCount = await prisma.users.count({
      where: {
        status: "INACTIVE",
      },
    });

    response.status(200).json(inactiveUserCount);
  } catch (error) {
    response.status(500).send("Error getting inactive user count");
  }
}

async function getUserCount(request, response) {
  try {
    const userCount = await prisma.users.count();

    response.status(200).json(userCount);
  } catch (error) {
    response.status(500).send("Error getting user count");
  }
}

async function getExFeederUserCount(request, response) {
  try {
    const exFeederUserCount = await prisma.users.count({
      where: {
        exFeeder: true,
      },
    });

    response.status(200).json(exFeederUserCount);
  } catch (error) {
    response.status(500).send("Error getting exFeeder user count");
  }
}

module.exports = {
  getHiddenUserCount,
  getInactiveUserCount,
  getUserCount,
  getExFeederUserCount,
};
