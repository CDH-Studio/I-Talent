const prisma = require("../../database");
const { normalizeDate } = require("./util/date");

async function getEducations(request, response) {
  const { userId } = request.params;
  const { language } = request.query;

  const query = await prisma.education.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      updatedAt: true,
      startDate: true,
      endDate: true,
      ongoingDate: true,
      description: true,
      diploma: {
        select: {
          id: true,
          translations: {
            select: {
              description: true,
              language: true,
            },
          },
        },
      },
      school: {
        select: {
          id: true,
          abbrCountry: true,
          abbrProvince: true,
          translations: {
            select: {
              name: true,
              language: true,
            },
          },
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

  const educations = query.map((education) => {
    const translatedDiploma =
      education.diploma.translations.find((i) => i.language === language) ||
      education.diploma.translations[0];

    const translatedSchool =
      education.school.translations.find((i) => i.language === language) ||
      education.school.translations[0];

    const attachmentLinks = education.attachmentLinks.map((link) => {
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

    return {
      id: education.id,
      startDate: education.startDate,
      endDate: education.endDate,
      ongoingDate: education.ongoingDate,
      description: education.description,
      diploma: {
        id: education.diploma.id,
        description: translatedDiploma ? translatedDiploma.description : null,
      },
      school: {
        id: education.school.id,
        country: education.school.abbrCountry,
        province: education.school.abbrProvince,
        name: translatedSchool ? translatedSchool.name : null,
      },
      attachmentLinks,
    };
  });

  response
    .status(200)
    .json({ data: educations, updatedAt: query ? query[0].updatedAt : null });
}

async function setEducations(request, response) {
  const { userId } = request.params;
  const { data } = request.body;
  const { language } = request.query;

  if (data.length > 0) {
    await prisma.$transaction([
      prisma.education.deleteMany({
        where: {
          userId,
        },
      }),
      prisma.transAttachmentLink.deleteMany({
        where: {
          AttachmentLink: {
            educationId: {
              in: data.map(({ id }) => id),
            },
          },
        },
      }),
      prisma.attachmentLink.deleteMany({
        where: {
          educationId: {
            in: data.map(({ id }) => id),
          },
        },
      }),
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          educations: {
            create: data.map((education) => ({
              startDate: normalizeDate(education.startDate, "month"),
              endDate: normalizeDate(education.endDate, "month"),
              ongoingDate: education.ongoingDate,
              description: education.description,
              diploma: {
                connect: {
                  id: education.diplomaId,
                },
              },
              school: {
                connect: {
                  id: education.schoolId,
                },
              },
              attachmentLinks:
                education.attachmentLinks &&
                education.attachmentLinks.length > 0
                  ? {
                      create: education.attachmentLinks.map((link) => ({
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
  getEducations,
  setEducations,
};
