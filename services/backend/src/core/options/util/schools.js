const { validationResult } = require("express-validator");
const _ = require("lodash");
const prisma = require("../../../database");

async function getSchools(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const schoolsQuery = await prisma.opTransSchool.findMany({
      where: {
        language,
      },
      select: {
        opSchoolId: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const schools = _.sortBy(
      schoolsQuery.map((i) => ({
        id: i.opSchoolId,
        name: i.name,
      })),
      "name"
    );

    response.status(200).json(schools);
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error fetching school options");
  }
}

async function getSchoolsAllLang(request, response) {
  try {
    const schoolsQuery = await prisma.opSchool.findMany({
      select: {
        id: true,
        abbrProvince: true,
        abbrCountry: true,
        translations: {
          select: {
            language: true,
            name: true,
          },
        },
      },
    });

    const schools = _.orderBy(
      schoolsQuery.map((i) => {
        const en = i.translations.find((j) => j.language === "ENGLISH");
        const fr = i.translations.find((j) => j.language === "FRENCH");
        return {
          id: i.id,
          abbrProvince: i.abbrProvince,
          abbrCountry: i.abbrCountry,
          en: en ? en.name : undefined,
          fr: fr ? fr.name : undefined,
        };
      }),
      ["abbrCountry", "abbrProvince", "en", "fr"]
    );

    response.status(200).json(schools);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .send("Error fetching school options in every language");
  }
}

async function createSchool(request, response) {
  try {
    validationResult(request).throw();

    const { abbrCountry, abbrProvince, en, fr } = request.body;

    if (!en && !fr) {
      response
        .status(422)
        .send("Must specify school name, either in english or in french");
      return;
    }

    const translations = [];

    if (en) {
      translations.push({
        name: en,
        language: "ENGLISH",
      });
    }

    if (fr) {
      translations.push({
        name: fr,
        language: "FRENCH",
      });
    }

    await prisma.opSchool.create({
      data: {
        abbrCountry,
        abbrProvince,
        translations: {
          create: translations,
        },
      },
    });

    response.status(200).send("Successfully created a school entry");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error creating a school entry");
  }
}

async function updateSchool(request, response) {
  try {
    validationResult(request).throw();

    const { id, abbrCountry, abbrProvince, en, fr } = request.body;

    if (!en && !fr) {
      response
        .status(500)
        .send("Must specify school name, either in english or in french");
      return;
    }

    const savedTranslations = await prisma.opSchool
      .findOne({
        where: {
          id,
        },
        select: {
          translations: {
            select: {
              language: true,
            },
          },
        },
      })
      .then((i) => i.translations.map((j) => j.language));

    const updateTranslations = [];
    const createTranslations = [];

    if (en) {
      if (savedTranslations.includes("ENGLISH")) {
        updateTranslations.push({
          where: {
            language: "ENGLISH",
          },
          data: {
            name: en,
          },
        });
      } else {
        createTranslations.push({
          name: en,
          language: "ENGLISH",
        });
      }
    }

    if (fr) {
      if (savedTranslations.includes("FRENCH")) {
        updateTranslations.push({
          where: {
            language: "FRENCH",
          },
          data: {
            name: fr,
          },
        });
      } else {
        createTranslations.push({
          name: fr,
          language: "FRENCH",
        });
      }
    }

    await prisma.opSchool.update({
      where: {
        id,
      },
      data: {
        abbrCountry,
        abbrProvince,
        translations: {
          updateMany: updateTranslations,
          create: createTranslations,
        },
      },
    });

    response
      .status(200)
      .send("Successfully updated the specified school entry");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error updating the specified school entry");
  }
}

async function deleteSchool(request, response) {
  try {
    validationResult(request).throw();

    const { id } = request.body;

    await prisma.opTransSchool.deleteMany({
      where: {
        opSchoolId: id,
      },
    });

    await prisma.opSchool.delete({
      where: {
        id,
      },
    });

    response
      .status(200)
      .send("Successfully deleted the specified school option");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error deleting the specified school option");
  }
}

async function deleteSchools(request, response) {
  try {
    validationResult(request).throw();

    const { ids } = request.body;

    await prisma.opTransSchool.deleteMany({
      where: {
        opSchoolId: {
          in: ids,
        },
      },
    });

    await prisma.opSchool.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    response
      .status(200)
      .send("Successfully deleted the specified school option");
  } catch (error) {
    console.log(error);
    if (error.errors) {
      response.status(422).json(error.errors);
      return;
    }
    response.status(500).send("Error deleting the specified school option");
  }
}

module.exports = {
  getSchools,
  getSchoolsAllLang,
  createSchool,
  updateSchool,
  deleteSchool,
  deleteSchools,
};
