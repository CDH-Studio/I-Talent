const _ = require("lodash");
const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");
const { hasVisibility } = require("./util/profileVisibility");

async function getRelocationLocations(request, response) {
  const { userId } = request.params;
  const { language } = request.query;

  const keycloakId = getKeycloakUserId(request);

  if (await hasVisibility(userId, keycloakId, "careerInterests")) {
    const query = await prisma.relocationLocation.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        relocationLocation: {
          select: {
            id: true,
            translations: {
              where: {
                language,
              },
              select: {
                city: true,
                province: true,
              },
            },
          },
        },
      },
    });

    const relocationLocations = _.orderBy(
      query.map(({ relocationLocation: { id, translations } }) => ({
        id,
        city: translations[0] ? translations[0].city : null,
        province: translations[0] ? translations[0].province : null,
      })),
      ["province", "city"]
    );

    response.status(200).json(relocationLocations);
  } else {
    response.sendStatus(403);
  }
}

async function setRelocationLocations(request, response) {
  const { userId } = request.params;
  const { ids } = request.body;

  await prisma.$transaction([
    prisma.relocationLocation.deleteMany({
      where: {
        userId,
        relocationLocationId: {
          notIn: ids,
        },
      },
    }),
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        relocationLocations: {
          create: ids.map((id) => ({
            relocationLocation: {
              connect: id,
            },
          })),
        },
      },
    }),
  ]);

  response.sendStatus(204);
}

module.exports = {
  getRelocationLocations,
  setRelocationLocations,
};
