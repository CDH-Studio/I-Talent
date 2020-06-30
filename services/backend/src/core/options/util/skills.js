const { validationResult } = require("express-validator");
const _ = require("lodash");
const prisma = require("../../../database");

async function getSkills(request, response) {
  try {
    validationResult(request).throw();

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
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching skill options");
  }
}

async function getSkillsAllLang(request, response) {
  try {
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
  } catch (error) {
    console.log(error);
    response.status(500).send("Error fetching skill options in every language");
  }
}

async function createSkill(request, response) {
  try {
    validationResult(request).throw();

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
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    if (error.code === "P2002") {
      response
        .status(409)
        .send("Category option already exists with that information");
      return;
    }
    response.status(500).send("Error creating a skill option");
  }
}

async function updateSkill(request, response) {
  try {
    validationResult(request).throw();

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

    response
      .status(200)
      .send("Successfully updated the specified skill option");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error updating the specified skill option");
  }
}

async function deleteSkill(request, response) {
  try {
    validationResult(request).throw();

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

    response
      .status(200)
      .send("Successfully deleted the specified skill option");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error deleting the specified skill option");
  }
}

async function deleteSkills(request, response) {
  try {
    validationResult(request).throw();

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

    response
      .status(200)
      .send("Successfully deleted the specified skill options");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error deleting the specified skill options");
  }
}

module.exports = {
  getSkills,
  getSkillsAllLang,
  createSkill,
  updateSkill,
  deleteSkill,
  deleteSkills,
};
