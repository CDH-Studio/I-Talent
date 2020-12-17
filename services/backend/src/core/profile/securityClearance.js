const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function setSecurityClearance(request, response) {
  const { id } = request.params;
  const userId = getKeycloakUserId(request);

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
  const userId = getKeycloakUserId(request);

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

  response.sendStatus(204);
}

module.exports = {
  setSecurityClearance,
  removeSecurityClearance,
};
