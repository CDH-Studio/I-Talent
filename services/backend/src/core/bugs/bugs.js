const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function createBug(request, response) {
  const { description, location } = request.body;
  const userId = getKeycloakUserId(request);

  await prisma.bug.create({
    data: {
      description,
      location,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  response.sendStatus(201);
}

async function getBugs(_request, response) {
  const bugs = await prisma.bug.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      description: true,
      location: true,
      status: true,
      appVersion: true,
      githubIssue: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  response.status(200).json(bugs);
}

async function updateBug(request, response) {
  const { id } = request.params;
  const { description, location, status, githubIssue } = request.body;

  await prisma.bug.update({
    where: {
      id,
    },
    data: {
      description,
      location,
      status,
      githubIssue,
    },
  });

  response.sendStatus(204);
}

module.exports = {
  createBug,
  getBugs,
  updateBug,
};
