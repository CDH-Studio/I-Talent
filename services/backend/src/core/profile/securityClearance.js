const prisma = require("../../database");

async function setSecurityClearance(request, response) {
  const { id, userId } = request.params;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      securityClearance: {
        connect: {
          id,
        },
      },
    },
  });

  response.sendStatus(201);
}

async function removeSecurityClearance(request, response) {
  const { userId } = request.params;

  const { securityClearance } = await prisma.user.findOne({
    where: { id: userId },
    select: { securityClearance: { select: { id: true } } },
  });

  if (securityClearance) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        securityClearance: {
          disconnect: true,
        },
      },
    });
  }

  response.sendStatus(204);
}

module.exports = {
  setSecurityClearance,
  removeSecurityClearance,
};
