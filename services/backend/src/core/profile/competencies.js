const _ = require("lodash");
const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function getCompetencies(request, response) {
  const { language } = request.query;
  const userId = getKeycloakUserId(request);

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
}

async function setCompetencies(request, response) {
  const { ids } = request.body;
  const userId = getKeycloakUserId(request);

  await prisma.$transaction([
    prisma.competency.deleteMany({
      where: {
        id: userId,
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
