const _ = require("lodash");
const prisma = require("../../database");
const { getKeycloakUserId } = require("../../utils/keycloak");
const { hasVisibility } = require("./util/profileVisibility");

async function getDevelopmentalGoals(request, response) {
  const { userId } = request.params;
  const { language } = request.query;

  const keycloakId = getKeycloakUserId(request);

  if (await hasVisibility(userId, keycloakId, "developmentalGoals")) {
    const queryDevelopmentalGoals = await prisma.developmentalGoal.findMany({
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

    const queryAttachments = await prisma.user.findOne({
      where: {
        id: userId,
      },
      select: {
        developmentalGoalsAttachments: {
          select: {
            id: true,
            translations: {
              select: {
                url: true,
                name: {
                  select: {
                    translations: true,
                  },
                },
                nameId: true,
                language: true,
              },
            },
          },
        },
      },
    });

    const developmentalGoals = _.sortBy(
      queryDevelopmentalGoals.reduce((acc, { skill, competency }) => {
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

    const attachments = queryAttachments.map((link) => {
      const translatedLink =
        link.translations.find((i) => i.language === language) ||
        link.translations[0];

      const translatedName =
        translatedLink.name.translations.find((i) => i.language === language) ||
        translatedLink.name.translations[0];

      return {
        id: link.id,
        url: translatedLink.url,
        name: {
          id: translatedLink.nameId,
          name: translatedName.name,
        },
      };
    });

    response.status(200).json({
      data: { developmentalGoals, attachments },
      updatedAt: queryDevelopmentalGoals
        ? queryDevelopmentalGoals[0].updatedAt
        : null,
    });
  } else {
    response.sendStatus(403);
  }
}

// TODO: add way to update dev goals attachments
async function setDevelopmentalGoals(request, response) {
  const { userId } = request.params;
  const { ids, attachments } = request.body;

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
