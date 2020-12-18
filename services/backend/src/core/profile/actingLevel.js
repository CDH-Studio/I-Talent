const prisma = require("../../database");

async function setActingLevel(request, response) {
  const { id, userId } = request.params;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      actingLevel: {
        connect: {
          id,
        },
      },
    },
  });

  response.sendStatus(201);
}

async function removeActingLevel(request, response) {
  const { userId } = request.params;

  const { actingLevel } = await prisma.user.findOne({
    where: { id: userId },
    select: { actingLevel: { select: { id: true } } },
  });

  if (actingLevel) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        actingLevel: {
          disconnect: true,
        },
      },
    });
  }

  response.sendStatus(204);
}

module.exports = {
  setActingLevel,
  removeActingLevel,
};
