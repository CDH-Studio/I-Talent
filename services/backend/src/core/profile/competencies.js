const _ = require("lodash");
const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");
const { hasVisibility } = require("./util/profileVisibility");

async function getCompetencies(request, response) {
  const { userId } = request.params;
  const { language } = request.query;
  const keycloakId = getKeycloakUserId(request);

  // TODO: maybe create a middleware for these checks?
  if (hasVisibility(userId, keycloakId, "competencies")) {
    const query = await prisma.competency.findMany({
      where: {
        userId,
      },
      select: {
        competency: {
          select: {
            id: true,
            translations: {
              where: {
                language,
              },
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const competencies = _.sortBy(
      query.map(({ competency: { id, translations } }) => ({
        id,
        name: translations[0].name,
      })),
      "name"
    );

    response.send(200).json(competencies);
  } else {
    response.sendStatus(403);
  }
}

async function setCompetencies(request, response) {
  const { ids } = request.body;
  const userId = getKeycloakUserId(request);

  if (getKeycloakUserId(request) === userId) {
    await prisma.$transaction([
      prisma.competency.deleteMany({
        where: {
          userId,
          competencyId: {
            notIn: ids,
          },
        },
      }),
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          competencies: {
            create: ids.map((id) => ({
              skill: {
                connect: {
                  id,
                },
              },
            })),
          },
        },
      }),
    ]);

    response.sendStatus(204);
  } else {
    response.sendStatus(403);
  }
}

module.exports = {
  getCompetencies,
  setCompetencies,
};
