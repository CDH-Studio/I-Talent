const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getDiplomas(request, response) {
  try {
    const { language } = request.query;

    const diplomasQuery = await prisma.opTransDiplomas.findMany({
      where: {
        language,
      },
      select: {
        opDiplomasId: true,
        description: true,
      },
    });

    const diplomas = diplomasQuery.map((i) => {
      return {
        id: i.opDiplomasId,
        description: i.description,
      };
    });

    response.status(200).json(diplomas);
  } catch (error) {
    response.status(500).send("Error fetching diploma options");
  }
}

async function getDiplomasAllLang(request, response) {
  try {
    const diplomasQuery = await prisma.opDiplomas.findMany({
      select: {
        id: true,
        translations: {
          select: {
            language: true,
            description: true,
          },
        },
      },
    });

    const diplomas = diplomasQuery.map((i) => {
      return {
        id: i.id,
        en: i.translations.find((j) => j.language === "ENGLISH").description,
        fr: i.translations.find((j) => j.language === "FRENCH").description,
      };
    });

    response.status(200).json(diplomas);
  } catch (error) {
    response
      .status(500)
      .send("Error fetching diploma options in every language");
  }
}

async function createDiploma(request, response) {
  try {
    const { en, fr } = request.body;

    await prisma.opDiplomas.create({
      data: {
        translations: {
          create: [
            {
              description: en,
              language: "ENGLISH",
            },
            {
              description: fr,
              language: "FRENCH",
            },
          ],
        },
      },
    });

    response.status(200).send("Successfully created a diploma option");
  } catch (error) {
    response.status(500).send("Error creating a diploma option");
  }
}

async function updateDiploma(request, response) {
  try {
    const { id, en, fr } = request.body;

    await prisma.opDiplomas.create({
      where: {
        id,
      },
      data: {
        translations: {
          create: [
            {
              description: en,
              language: "ENGLISH",
            },
            {
              description: fr,
              language: "FRENCH",
            },
          ],
        },
      },
    });

    response
      .status(200)
      .send("Successfully updated the specified diploma option");
  } catch (error) {
    response.status(500).send("Error updating the specified diploma option");
  }
}

async function deleteDiploma(request, response) {
  try {
    const { id } = request.query;

    await prisma.opTransDiplomas.delete({
      where: {
        id,
      },
    });

    response
      .status(200)
      .send("Successfully deleted the specified diploma option");
  } catch (error) {
    response.status(500).send("Error deleting the specified diploma option");
  }
}

async function deleteDiplomas(request, response) {
  try {
    const { ids } = request.query;

    await prisma.opTransDiplomas.deleteMany({
      where: {
        id: {
          in: [ids],
        },
      },
    });

    response
      .status(200)
      .send("Successfully deleted the specified diploma options");
  } catch (error) {
    response.status(500).send("Error deleting the specified diploma options");
  }
}

module.exports = {
  getDiplomas,
  getDiplomasAllLang,
  createDiploma,
  updateDiploma,
  deleteDiploma,
  deleteDiplomas,
};
