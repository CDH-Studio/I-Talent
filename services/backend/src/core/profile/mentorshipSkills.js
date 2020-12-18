const _ = require("lodash");
const prisma = require("../../database");

async function getMentorshipSkills(request, response) {
  const { userId } = request.params;
  const { language } = request.query;

  const query = await prisma.mentorshipSkill.findMany({
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

  const mentorshipSkills = _.sortBy(
    query.map(({ skill: { id, translations, category } }) => ({
      id,
      name: translations[0].name,
      categoryId: category.id,
      category: category.translations[0].name,
    })),
    "name"
  );

  response.status(200).json(mentorshipSkills);
}

async function setMentorshipSkills(request, response) {
  const { userId } = request.params;
  const { ids } = request.body;

  await prisma.$transaction([
    prisma.mentorshipSkill.deleteMany({
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
        mentorshipSkills: {
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
  getMentorshipSkills,
  setMentorshipSkills,
};
