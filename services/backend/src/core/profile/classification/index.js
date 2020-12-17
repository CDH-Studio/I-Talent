const prisma = require("../../../database");
const { getKeycloakUserId } = require("../../../utils/keycloak");

async function setClassification(request, response) {
  const { id } = request.params;
  const userId = getKeycloakUserId(request);

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

async function removeClassification(request, response) {
  const userId = getKeycloakUserId(request);

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
}

module.exports = {
  setClassification,
  removeClassification,
};
