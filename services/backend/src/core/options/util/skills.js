const _ = require("lodash");
const prisma = require("../../../database");

async function getSkills(request, response) {
  const { language } = request.query;

  const skillsQuery = await prisma.opTransSkill.findMany({
    where: {
      language,
    },
    select: {
      name: true,
      opSkill: {
        select: {
          id: true,
          categoryId: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  const skills = _.sortBy(
    skillsQuery.map((i) => ({
      categoryId: i.opSkill.categoryId,
      id: i.opSkill.id,
      name: i.name,
    })),
    "name"
  );

  response.status(200).json(skills);
}

async function getSkillsAllLang(_request, response) {
  const skillsQuery = await prisma.opSkill.findMany({
    select: {
      id: true,
      categoryId: true,
      translations: {
        select: {
          language: true,
          name: true,
        },
      },
    },
  });

  const skills = _.orderBy(
    skillsQuery.map((i) => ({
      id: i.id,
      en: i.translations.find((j) => j.language === "ENGLISH").name,
      fr: i.translations.find((j) => j.language === "FRENCH").name,
      categoryId: i.categoryId,
    })),
    ["en", "fr"]
  );

  response.status(200).json(skills);
}

async function createSkill(request, response) {
  const { en, fr, categoryId } = request.body;

  await prisma.opSkill.create({
    data: {
      category: {
        connect: {
          id: categoryId,
        },
      },
      translations: {
        create: [
          {
            name: en,
            language: "ENGLISH",
          },
          {
            name: fr,
            language: "FRENCH",
          },
        ],
      },
    },
  });

  response.sendStatus(201);
}

async function updateSkill(request, response) {
  const { id, en, fr, categoryId } = request.body;

  await prisma.opSkill.update({
    where: {
      id,
    },
    data: {
      category: {
        connect: {
          id: categoryId,
        },
      },
      translations: {
        updateMany: [
          {
            where: {
              language: "ENGLISH",
            },
            data: {
              name: en,
            },
          },
          {
            where: {
              language: "FRENCH",
            },
            data: {
              name: fr,
            },
          },
        ],
      },
    },
  });

  response.sendStatus(204);
}

async function deleteSkill(request, response) {
  const { id } = request.body;

  await prisma.$transaction([
    prisma.skill.deleteMany({
      where: {
        skillId: id,
      },
    }),
    prisma.mentorshipSkill.deleteMany({
      where: {
        skillId: id,
      },
    }),
    prisma.developmentalGoal.deleteMany({
      where: {
        skillId: id,
      },
    }),
    prisma.opTransSkill.deleteMany({
      where: {
        opSkillId: id,
      },
    }),
    prisma.opSkill.delete({
      where: {
        id,
      },
    }),
  ]);

  response.sendStatus(204);
}

async function deleteSkills(request, response) {
  const { ids } = request.body;

  await prisma.$transaction([
    prisma.skill.deleteMany({
      where: {
        skillId: {
          in: ids,
        },
      },
    }),
    prisma.mentorshipSkill.deleteMany({
      where: {
        skillId: {
          in: ids,
        },
      },
    }),
    prisma.developmentalGoal.deleteMany({
      where: {
        skillId: {
          in: ids,
        },
      },
    }),
    prisma.opTransSkill.deleteMany({
      where: {
        opSkillId: {
          in: ids,
        },
      },
    }),
    prisma.opSkill.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  ]);

  response.sendStatus(204);
}

module.exports = {
  getSkills,
  getSkillsAllLang,
  createSkill,
  updateSkill,
  deleteSkill,
  deleteSkills,
};
