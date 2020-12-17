const prisma = require("../../../database");
const { getKeycloakUserId } = require("../../../utils/keycloak");

async function setOfficeLocation(request, response) {
  const { id } = request.params;
  const userId = getKeycloakUserId(request);

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
  const userId = getKeycloakUserId(request);

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

  response.sendStatus(204);
}

module.exports = {
  setOfficeLocation,
  removeOfficeLocation,
};
