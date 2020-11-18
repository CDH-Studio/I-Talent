const _ = require("lodash");
const prisma = require("../../../database");

async function getCategories(request, response) {
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

  const categories = _.sortBy(
    categoriesQuery.map((i) => ({
      id: i.opCategoryId,
      name: i.name,
    })),
    "name"
  );

  response.status(200).json(categories);
}

async function getCategoriesAllLang(request, response) {
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
      id: i.id,
      en: i.translations.find((j) => j.language === "ENGLISH").name,
      fr: i.translations.find((j) => j.language === "FRENCH").name,
    })),
    ["en", "fr"]
  );

  response.status(200).json(categories);
}

async function createCategory(request, response) {
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

  response.status(200).send("Successfully created a category option");
}

async function updateCategory(request, response) {
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

  response
    .status(200)
    .send("Successfully updated the specified category option");
}

async function deleteCategory(request, response) {
  const { id } = request.body;

  await prisma.$transaction([
    prisma.opTransCategory.deleteMany({
      where: {
        opCategoryId: id,
      },
    }),
    prisma.opCategory.delete({
      where: {
        id,
      },
    }),
  ]);

  response
    .status(200)
    .send("Successfully deleted the specified category option");
}

async function deleteCategories(request, response) {
  const { ids } = request.body;

  await prisma.$transaction([
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

  response
    .status(200)
    .send("Successfully deleted the specified category options");
}

module.exports = {
  getCategories,
  getCategoriesAllLang,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteCategories,
};
