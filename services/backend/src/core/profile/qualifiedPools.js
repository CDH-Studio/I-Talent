const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");
const { hasVisibility } = require("./util/profileVisibility");

async function getQualifiedPools(request, response) {
  const { userId } = request.params;

  const keycloakId = getKeycloakUserId(request);

  if (await hasVisibility(userId, keycloakId, "qualifiedPools")) {
    const query = await prisma.qualifiedPool.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        updatedAt: true,
        jobTitle: true,
        selectionProcessNumber: true,
        jobPosterLink: true,
        classification: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const experiences = query.map((i) => {
      const data = { ...i };
      delete data.updatedAt;
      return data;
    });

    response.status(200).json({
      data: experiences,
      updatedAt: query ? query[0].updatedAt : null,
    });
  } else {
    response.sendStatus(403);
  }
}

async function setQualifiedPools(request, response) {
  const { userId } = request.params;
  const { data } = request.body;

  if (data.length > 0) {
    await prisma.$transaction([
      prisma.qualifiedPool.deleteMany({
        where: {
          userId,
        },
      }),
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          qualifiedPools: {
            create: data.map((item) => ({
              jobTitle: item.jobTitle,
              selectionProcessNumber: item.selectionProcessNumber,
              jobPosterLink: item.jobPosterLink,
              classification: {
                connect: {
                  id: item.classificationId,
                },
              },
            })),
          },
        },
      }),
    ]);
  }

  response.sendStatus(204);
}

module.exports = {
  getQualifiedPools,
  setQualifiedPools,
};
