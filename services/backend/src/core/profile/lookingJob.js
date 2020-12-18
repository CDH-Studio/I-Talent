const prisma = require("../../database");

async function setLookingJob(request, response) {
  const { id, userId } = request.params;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      lookingJob: {
        connect: {
          id,
        },
      },
    },
  });

  response.sendStatus(201);
}

async function removeLookingJob(request, response) {
  const { userId } = request.params;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      lookingJob: {
        disconnect: true,
      },
    },
  });

  response.sendStatus(204);
}

module.exports = {
  setLookingJob,
  removeLookingJob,
};
