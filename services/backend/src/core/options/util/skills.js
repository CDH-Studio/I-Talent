const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getSkills(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const skillsQuery = await prisma.opTransSkills.findMany({
      where: {
        language,
      },
      select: {
        opSkillsId: true,
        name: true,
      },
    });

    const skills = skillsQuery.map((i) => {
      return {
        id: i.opSkillsId,
        name: i.name,
      };
    });

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
    const skillsQuery = await prisma.opSkills.findMany({
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

    const skills = skillsQuery.map((i) => {
      return {
        id: i.id,
        en: i.translations.find((j) => j.language === "ENGLISH").name,
        fr: i.translations.find((j) => j.language === "FRENCH").name,
      };
    });

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

    await prisma.opSkills.create({
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
    response.status(500).send("Error creating a skill option");
  }
}

async function updateSkill(request, response) {
  try {
    validationResult(request).throw();

    const { id, en, fr, categoryId } = request.body;

    await prisma.opSkills.update({
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

    await prisma.skills.deleteMany({
      where: {
        skillId: id,
      },
    });

    await prisma.mentorshipSkills.deleteMany({
      where: {
        skillId: id,
      },
    });

    await prisma.developmentalGoals.deleteMany({
      where: {
        skillId: id,
      },
    });

    await prisma.opSkills.delete({
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

    await prisma.skills.deleteMany({
      where: {
        skillId: {
          in: ids,
        },
      },
    });

    await prisma.mentorshipSkills.deleteMany({
      where: {
        skillId: {
          in: ids,
        },
      },
    });

    await prisma.developmentalGoals.deleteMany({
      where: {
        skillId: {
          in: ids,
        },
      },
    });

    await prisma.opSkills.deleteMany({
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
