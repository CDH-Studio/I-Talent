const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function addConnection(request, response) {
  const { id } = request.params;
  const userId = getKeycloakUserId(request);

  if (userId && id) {
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

    response.status(200).json("Successfully added connection");
    return;
  }

  response
    .status(403)
    .json({ data: "Access to private account has be denied." });
}

async function removeConnection(request, response) {
  const { id } = request.params;
  const userId = getKeycloakUserId(request);

  if (userId && id) {
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

    response.status(200).json("Successfully deleted connection");
    return;
  }

  response
    .status(403)
    .json({ data: "Access to private account has be denied." });
}

async function getConnectionById(request, response) {
  const { id } = request.params;
  const userId = getKeycloakUserId(request);

  if (userId && id) {
    const connections = await prisma.user.findOne({
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
    return;
  }

  response
    .status(403)
    .json({ data: "Access to private account has be denied." });
}

module.exports = {
  addConnection,
  removeConnection,
  getConnectionById,
};
