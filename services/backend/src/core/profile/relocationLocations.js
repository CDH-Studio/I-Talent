const _ = require("lodash");
const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function getRelocationLocations(request, response) {
  const { language } = request.query;
  const userId = getKeycloakUserId(request);

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

  response.send(200).json(relocationLocations);
}

async function setRelocationLocations(request, response) {
  const { ids } = request.body;
  const userId = getKeycloakUserId(request);

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
