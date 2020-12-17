const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function setClassification(request, response) {
  const { id, userId } = request.params;

  if (getKeycloakUserId(request) === userId) {
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
  } else {
    response.sendStatus(403);
  }
}

async function removeClassification(request, response) {
  const { userId } = request.params;

  if (getKeycloakUserId(request) === userId) {
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

    response.sendStatus(204);
  } else {
    response.sendStatus(403);
  }
}

module.exports = {
  setClassification,
  removeClassification,
};
