const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function setCareerMobility(request, response) {
  const { id, userId } = request.params;

  /// ~~~~~~~~~~~ TODO: create middleware for these kinds of checks!
  if (getKeycloakUserId(request) === userId) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        careerMobility: {
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

async function removeCareerMobility(request, response) {
  const { userId } = request.params;

  if (getKeycloakUserId(request) === userId) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        careerMobility: {
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
  setCareerMobility,
  removeCareerMobility,
};
