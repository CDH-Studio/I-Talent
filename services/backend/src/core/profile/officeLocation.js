const prisma = require("../../database");

async function setOfficeLocation(request, response) {
  const { id, userId } = request.params;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      officeLocation: {
        connect: {
          id,
        },
      },
    },
  });

  response.sendStatus(201);
}

async function removeOfficeLocation(request, response) {
  const { userId } = request.params;

  const { officeLocation } = await prisma.user.findOne({
    where: { id: userId },
    select: { securityClearance: { select: { id: true } } },
  });

  if (officeLocation) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        officeLocation: {
          disconnect: true,
        },
      },
    });
  }

  response.sendStatus(204);
}

module.exports = {
  setOfficeLocation,
  removeOfficeLocation,
};
