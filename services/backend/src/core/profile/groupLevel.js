const prisma = require("../../database");

async function setGroupLevel(request, response) {
  const { id, userId } = request.params;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      groupLevel: {
        connect: {
          id,
        },
      },
    },
  });

  response.sendStatus(201);
}

async function removeGroupLevel(request, response) {
  const { userId } = request.params;

  const { groupLevel } = await prisma.user.findOne({
    where: { id: userId },
    select: { groupLevel: { select: { id: true } } },
  });

  if (groupLevel) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        groupLevel: {
          disconnect: true,
        },
      },
    });
  }

  response.sendStatus(204);
}

module.exports = {
  setGroupLevel,
  removeGroupLevel,
};
