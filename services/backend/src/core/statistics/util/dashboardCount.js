const prisma = require("../../../database");

async function countHiddenUsers(request, response) {
  try {
    const hiddenUserCount = await prisma.user.count({
      where: {
        status: "HIDDEN",
      },
    });

    response.status(200).json(hiddenUserCount);
  } catch (error) {
    console.log(error);
    response.status(500).send("Error getting hidden user count");
  }
}

async function countInactiveUsers(request, response) {
  try {
    const inactiveUserCount = await prisma.user.count({
      where: {
        status: "INACTIVE",
      },
    });

    response.status(200).json(inactiveUserCount);
  } catch (error) {
    console.log(error);
    response.status(500).send("Error getting inactive user count");
  }
}

async function countUsers(request, response) {
  try {
    const userCount = await prisma.user.count();

    response.status(200).json(userCount);
  } catch (error) {
    console.log(error);
    response.status(500).send("Error getting user count");
  }
}

async function countExFeederUsers(request, response) {
  try {
    const exFeederUserCount = await prisma.user.count({
      where: {
        exFeeder: true,
      },
    });

    response.status(200).json(exFeederUserCount);
  } catch (error) {
    console.log(error);
    response.status(500).send("Error getting exFeeder user count");
  }
}

module.exports = {
  countHiddenUsers,
  countInactiveUsers,
  countUsers,
  countExFeederUsers,
};
