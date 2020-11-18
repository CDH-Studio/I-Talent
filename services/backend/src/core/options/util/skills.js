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
      id: i.opSkill.id,
      name: i.name,
      categoryId: i.opSkill.categoryId,
    })),
    "name"
  );

  response.status(200).json(skills);
}

async function getSkillsAllLang(request, response) {
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

  response.status(200).send("Successfully created a skill option");
}

async function updateSkill(request, response) {
  const { id, en, fr, categoryId } = request.body;

  await prisma.opSkill.update({
    where: {
      id,
    },
    data: {
      category: {
        connect: categoryId
          ? {
              id: categoryId,
            }
          : undefined,
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

  response.status(200).send("Successfully updated the specified skill option");
}

async function deleteSkill(request, response) {
  const { id } = request.body;

  await prisma.skill.deleteMany({
    where: {
      skillId: id,
    },
  });

  await prisma.mentorshipSkill.deleteMany({
    where: {
      skillId: id,
    },
  });

  await prisma.developmentalGoal.deleteMany({
    where: {
      skillId: id,
    },
  });

  await prisma.opTransSkill.deleteMany({
    where: {
      opSkillId: id,
    },
  });

  await prisma.opSkill.delete({
    where: {
      id,
    },
  });

  response.status(200).send("Successfully deleted the specified skill option");
}

async function deleteSkills(request, response) {
  const { ids } = request.body;

  await prisma.skill.deleteMany({
    where: {
      skillId: {
        in: ids,
      },
    },
  });

  await prisma.mentorshipSkill.deleteMany({
    where: {
      skillId: {
        in: ids,
      },
    },
  });

  await prisma.developmentalGoal.deleteMany({
    where: {
      skillId: {
        in: ids,
      },
    },
  });

  await prisma.opTransSkill.deleteMany({
    where: {
      opSkillId: {
        in: ids,
      },
    },
  });

  await prisma.opSkill.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  response.status(200).send("Successfully deleted the specified skill options");
}

module.exports = {
  getSkills,
  getSkillsAllLang,
  createSkill,
  updateSkill,
  deleteSkill,
  deleteSkills,
};
