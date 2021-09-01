const _ = require("lodash");
const prisma = require("../../../database");

async function getSkillCategories(request, response) {
  const { language } = request.query;

  const categoriesQuery = await prisma.opTransCategory.findMany({
    where: {
      language,
    },
    select: {
      opCategoryId: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const categories = categoriesQuery.map((i) => ({
    value: i.opCategoryId,
    label: i.name,
  }));

  response.status(200).json(categories);
}

async function getSkillCategoriesAllLang(_request, response) {
  const categoriesQuery = await prisma.opCategory.findMany({
    select: {
      id: true,
      translations: {
        select: {
          language: true,
          name: true,
        },
      },
    },
  });

  const categories = _.orderBy(
    categoriesQuery.map((i) => ({
      en: i.translations.find((j) => j.language === "ENGLISH").name,
      fr: i.translations.find((j) => j.language === "FRENCH").name,
      id: i.id,
    })),
    ["en", "fr"]
  );

  response.status(200).json(categories);
}

async function createSkillCategory(request, response) {
  const { en, fr } = request.body;

  await prisma.opCategory.create({
    data: {
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

async function updateSkillCategory(request, response) {
  const { id, en, fr } = request.body;

  await prisma.opCategory.update({
    where: {
      id,
    },
    data: {
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

async function deleteSkillCategories(request, response) {
  const { ids } = request.body;

  if (ids.length < 1) {
    response.sendStatus(500);
    return;
  }

  let skillsId = await prisma.opCategory.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    select: {
      opSkills: true,
    },
  });

  if (skillsId && skillsId.length > 0) {
    skillsId = _.flatten(
      skillsId.map(({ opSkills }) => opSkills.map(({ id }) => id)) || []
    );
  } else {
    skillsId = [];
  }

  await prisma.$transaction([
    prisma.skill.deleteMany({
      where: {
        skillId: {
          in: skillsId,
        },
      },
    }),
    prisma.mentorshipSkill.deleteMany({
      where: {
        skillId: {
          in: skillsId,
        },
      },
    }),
    prisma.developmentalGoal.deleteMany({
      where: {
        skillId: {
          in: skillsId,
        },
      },
    }),
    prisma.opTransSkill.deleteMany({
      where: {
        opSkillId: {
          in: skillsId,
        },
      },
    }),
    prisma.opSkill.deleteMany({
      where: {
        id: {
          in: skillsId,
        },
      },
    }),
    prisma.opTransCategory.deleteMany({
      where: {
        opCategoryId: {
          in: ids,
        },
      },
    }),
    prisma.opCategory.deleteMany({
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
  getSkillCategories,
  getSkillCategoriesAllLang,
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategories,
};
