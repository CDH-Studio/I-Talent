const _ = require("lodash");
const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");
const { hasVisibility } = require("./util/profileVisibility");

async function getCompetencies(request, response) {
  const { userId } = request.params;
  const { language } = request.query;

  const keycloakId = getKeycloakUserId(request);

  if (await hasVisibility(userId, keycloakId, "competencies", request)) {
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
      orderBy: {
        updatedAt: "desc",
      },
    });

    const competencies = _.sortBy(
      query.map(({ competency: { id, translations } }) => ({
        id,
        name: translations[0].name,
      })),
      "name"
    );

    response.status(200).json({
      data: competencies,
      updatedAt: query.length > 0 ? query[0].updatedAt : null,
    });
  } else {
    // TODO: Should send 403, but will need to modify the frontend more to handle the errors and everywhere else in these similar APIs
    response.status(200).json({ data: [], updatedAt: null });
  }
}

async function setCompetencies(request, response) {
  const { userId } = request.params;
  const { ids } = request.body;

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
}

module.exports = {
  getCompetencies,
  setCompetencies,
};
