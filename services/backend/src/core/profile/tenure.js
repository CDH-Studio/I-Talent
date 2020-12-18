const prisma = require("../../database");

async function setTenure(request, response) {
  const { id, userId } = request.params;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      tenure: {
        connect: {
          id,
        },
      },
    },
  });

  response.sendStatus(201);
}

async function removeTenure(request, response) {
  const { userId } = request.params;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      tenure: {
        disconnect: true,
      },
    },
  });

  response.sendStatus(204);
}

module.exports = {
  setTenure,
  removeTenure,
};
