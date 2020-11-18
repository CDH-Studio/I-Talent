const prisma = require("../../../database");

async function countHiddenUsers(request, response) {
  const hiddenUserCount = await prisma.user.count({
    where: {
      status: "HIDDEN",
    },
  });

  response.status(200).json(hiddenUserCount);
}

async function countInactiveUsers(request, response) {
  const inactiveUserCount = await prisma.user.count({
    where: {
      status: "INACTIVE",
    },
  });

  response.status(200).json(inactiveUserCount);
}

async function countUsers(request, response) {
  const userCount = await prisma.user.count();

  response.status(200).json(userCount);
}

async function countExFeederUsers(request, response) {
  const exFeederUserCount = await prisma.user.count({
    where: {
      exFeeder: true,
    },
  });

  response.status(200).json(exFeederUserCount);
}

module.exports = {
  countHiddenUsers,
  countInactiveUsers,
  countUsers,
  countExFeederUsers,
};
