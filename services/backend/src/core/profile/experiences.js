const prisma = require("../../database");
const { normalizeDate } = require("./util/date");
const { getKeycloakUserId } = require("../../utils/keycloak");
const { hasVisibility } = require("./util/profileVisibility");

async function getExperiences(request, response) {
  const { userId } = request.params;
  const { language } = request.query;

  const keycloakId = getKeycloakUserId(request);

  if (await hasVisibility(userId, keycloakId, "experience", request)) {
    const query = await prisma.experience.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        updatedAt: true,
        startDate: true,
        endDate: true,
        ongoingDate: true,
        projects: true,
        translations: {
          select: {
            language: true,
            description: true,
            jobTitle: true,
            organization: true,
          },
        },
        attachmentLinks: {
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
      orderBy: {
        updatedAt: "desc",
      },
    });

    const experiences = query.map((experience) => {
      const translatedExperience =
        experience.translations.find((i) => i.language === language) ||
        experience.translations[0];

      const attachmentLinks = experience.attachmentLinks.map((link) => {
        const translatedLink =
          link.translations.find((i) => i.language === language) ||
          link.translations[0];

        const translatedName =
          translatedLink.name.translations.find(
            (i) => i.language === language
          ) || translatedLink.name.translations[0];

        return {
          id: link.id,
          url: translatedLink.url,
          name: {
            id: translatedLink.nameId,
            name: translatedName.name,
          },
        };
      });

      return {
        id: experience.id,
        startDate: experience.startDate,
        endDate: experience.endDate,
        ongoingDate: experience.ongoingDate,
        description: translatedExperience
          ? translatedExperience.description
          : null,
        jobTitle: translatedExperience ? translatedExperience.jobTitle : null,
        organization: translatedExperience
          ? translatedExperience.organization
          : null,
        attachmentLinks,
        projects: experience.projects,
      };
    });

    response.status(200).json({
      data: experiences,
      updatedAt: query.length > 0 ? query[0].updatedAt : null,
    });
  } else {
    response.status(200).json({ data: [], updatedAt: null });
  }
}

async function setExperiences(request, response) {
  const { userId } = request.params;
  const { data } = request.body;
  const { language } = request.query;

  if (data.length > 0) {
    await prisma.$transaction([
      prisma.transAttachmentLink.deleteMany({
        where: {
          AttachmentLink: {
            experienceId: {
              in: data.map(({ id }) => id),
            },
          },
        },
      }),
      prisma.attachmentLink.deleteMany({
        where: {
          experienceId: {
            in: data.map(({ id }) => id),
          },
        },
      }),
      prisma.experience.deleteMany({
        where: {
          userId,
        },
      }),
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          experiences: {
            create: data.map((expItem) => ({
              startDate: normalizeDate(expItem.startDate, "month"),
              endDate: normalizeDate(expItem.endDate, "month"),
              ongoingDate: expItem.ongoingDate,
              projects: expItem.projects
                ? {
                    set: expItem.projects,
                  }
                : undefined,
              translations: {
                create: {
                  language,
                  jobTitle: expItem.jobTitle,
                  organization: expItem.organization,
                  description: expItem.description,
                },
              },
              attachmentLinks:
                expItem.attachmentLinks && expItem.attachmentLinks.length > 0
                  ? {
                      create: expItem.attachmentLinks.map((link) => ({
                        translations: {
                          create: {
                            language,
                            name: {
                              connect: {
                                id: link.nameId,
                              },
                            },
                            url: link.url,
                          },
                        },
                      })),
                    }
                  : undefined,
            })),
          },
        },
      }),
    ]);
  }

  response.sendStatus(204);
}

module.exports = {
  getExperiences,
  setExperiences,
};
