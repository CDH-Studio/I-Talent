const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function addConnection(request, response) {
  const { id } = request.params;
  const userId = getKeycloakUserId(request);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      connections: {
        connect: {
          id,
        },
      },
    },
  });

  response.sendStatus(201);
}

async function removeConnection(request, response) {
  const { id } = request.params;
  const userId = getKeycloakUserId(request);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      connections: {
        disconnect: {
          id,
        },
      },
    },
  });

  response.sendStatus(204);
}

async function getConnectionById(request, response) {
  const { id } = request.params;
  const userId = getKeycloakUserId(request);

  const connections = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      connections: { select: { id: true } },
    },
  });

  response.status(200).json({
    status: connections.connections.some((item) => item.id === id),
  });
}

module.exports = {
  addConnection,
  removeConnection,
  getConnectionById,
};
