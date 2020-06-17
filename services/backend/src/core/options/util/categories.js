const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getCategories(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const categoriesQuery = await prisma.opTransCategories.findMany({
      where: {
        language,
      },
      select: {
        opCategoriesId: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const categories = categoriesQuery.map((i) => {
      return {
        id: i.opCategoriesId,
        name: i.name,
      };
    });

    response.status(200).json(categories);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching category options");
  }
}

async function getCategoriesAllLang(request, response) {
  try {
    const categoriesQuery = await prisma.opCategories.findMany({
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

    const categories = categoriesQuery.map((i) => {
      return {
        id: i.id,
        en: i.translations.find((j) => j.language === "ENGLISH").name,
        fr: i.translations.find((j) => j.language === "FRENCH").name,
      };
    });

    response.status(200).json(categories);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .send("Error fetching category options in every language");
  }
}

async function createCategory(request, response) {
  try {
    validationResult(request).throw();

    const { en, fr } = request.body;

    await prisma.opCategories.create({
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

    response.status(200).send("Successfully created a category option");
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
    response.status(500).send("Error creating a category option");
  }
}

async function updateCategory(request, response) {
  try {
    validationResult(request).throw();

    const { id, en, fr } = request.body;

    await prisma.opCategories.update({
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

    response
      .status(200)
      .send("Successfully updated the specified category option");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error updating the specified category option");
  }
}

async function deleteCategory(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.body;

    await prisma.opTransCategories.deleteMany({
      where: {
        opCategoriesId: id,
      },
    });

    await prisma.opCategories.delete({
      where: {
        id,
      },
    });

    response
      .status(200)
      .send("Successfully deleted the specified category option");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error deleting the specified category option");
  }
}

async function deleteCategories(request, response) {
  try {
    validationResult(request).throw();

    const { ids } = request.body;

    await prisma.opTransCategories.deleteMany({
      where: {
        opCategoriesId: {
          in: ids,
        },
      },
    });

    await prisma.opCategories.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    response
      .status(200)
      .send("Successfully deleted the specified category options");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error deleting the specified category options");
  }
}

module.exports = {
  getCategories,
  getCategoriesAllLang,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteCategories,
};
