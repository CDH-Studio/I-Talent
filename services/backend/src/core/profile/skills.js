const _ = require("lodash");
const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function getSkills(request, response) {
  const { language } = request.query;
  const userId = getKeycloakUserId(request);

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

  response.send(200).json(skills);
}

async function setSkills(request, response) {
  const { ids } = request.body;
  const userId = getKeycloakUserId(request);

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
