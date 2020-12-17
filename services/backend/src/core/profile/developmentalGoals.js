const _ = require("lodash");
const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");

async function getDevelopmentalGoals(request, response) {
  const { language } = request.query;
  const userId = getKeycloakUserId(request);

  const query = await prisma.developmentalGoal.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      updatedAt: true,
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
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const developmentalGoals = _.sortBy(
    query.reduce((acc, { skill, competency }) => {
      if (skill && skill.translations) {
        acc.push({
          id: skill.id,
          name: skill.translations[0].name,
        });
      }

      if (competency && competency.translations) {
        acc.push({
          id: competency.id,
          name: competency.translations[0].name,
        });
      }

      return acc;
    }, []),
    "name"
  );

  response.send(200).json({
    data: developmentalGoals,
    updatedAt: query ? query[0].updatedAt : null,
  });
}

async function setDevelopmentalGoals(request, response) {
  const { ids } = request.body;
  const userId = getKeycloakUserId(request);

  // TODO: We should add a check to see if the ids are in the thing or see how prisma handles it - it should not error out

  const developmentalGoalsCreate = [];

  const skillIds = await prisma.opSkill.findMany({
    where: { id: { in: ids } },
    select: { id: true },
  });

  skillIds.map(({ id }) =>
    developmentalGoalsCreate.push({ skill: { connect: { id } } })
  );

  const competencyIds = await prisma.opCompetency.findMany({
    where: { id: { in: ids } },
    select: { id: true },
  });

  competencyIds.map(({ id }) =>
    developmentalGoalsCreate.push({ competency: { connect: { id } } })
  );

  await prisma.$transaction([
    prisma.developmentalGoal.deleteMany({
      where: {
        userId,
        skillId: {
          notIn: ids,
        },
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
        developmentalGoals: {
          create: developmentalGoalsCreate,
        },
      },
    }),
  ]);

  response.sendStatus(204);
}

module.exports = {
  getDevelopmentalGoals,
  setDevelopmentalGoals,
};
