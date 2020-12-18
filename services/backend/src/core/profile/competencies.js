const _ = require("lodash");
const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");
const { hasVisibility } = require("./util/profileVisibility");

async function getCompetencies(request, response) {
  const { userId } = request.params;
  const { language } = request.query;

  const keycloakId = getKeycloakUserId(request);

  if (await hasVisibility(userId, keycloakId, "competencies")) {
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

    response.status(200).json(competencies);
  } else {
    response.sendStatus(403);
  }
}

async function setCompetencies(request, response) {
  const { ids, userId } = request.body;

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
