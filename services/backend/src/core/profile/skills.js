const _ = require("lodash");
const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");
const { hasVisibility } = require("./util/profileVisibility");

async function getSkills(request, response) {
  const { userId } = request.params;
  const { language } = request.query;

  const keycloakId = getKeycloakUserId(request);

  if (await hasVisibility(userId, keycloakId, "skills", request)) {
    const query = await prisma.skill.findMany({
      where: {
        userId,
      },
      select: {
        skill: {
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
            category: {
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
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const skills = _.sortBy(
      query.map(({ skill: { id, translations, category } }) => ({
        id,
        name: translations[0].name,
        categoryId: category.id,
        category: category.translations[0].name,
      })),
      "name"
    );

    response.status(200).json({
      data: skills,
      updatedAt: query.length > 0 ? query[0].updatedAt : null,
    });
  } else {
    response.status(200).json({ data: [], updatedAt: null });
  }
}

async function setSkills(request, response) {
  const { userId } = request.params;
  const { ids } = request.body;

  await prisma.$transaction([
    prisma.skill.deleteMany({
      where: {
        userId,
        skillId: {
          notIn: ids,
        },
      },
    }),
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        skills: {
          create: ids.map((id) => ({
            skill: {
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
  getSkills,
  setSkills,
};
