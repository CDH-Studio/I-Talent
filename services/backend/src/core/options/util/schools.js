const { validationResult } = require("express-validator");
const { PrismaClient } = require("../../../database/client");

const prisma = new PrismaClient();

async function getSchools(request, response) {
  try {
    validationResult(request).throw();

    const { language } = request.query;

    const schoolsQuery = await prisma.opTransSchools.findMany({
      where: {
        language,
      },
      select: {
        opSchoolsId: true,
        name: true,
      },
    });

    const schools = schoolsQuery.map((i) => {
      return {
        id: i.opSchoolsId,
        name: i.name,
      };
    });

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
    const schoolsQuery = await prisma.opSchools.findMany({
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

    const schools = schoolsQuery.map((i) => {
      return {
        id: i.id,
        abbrProvince: i.abbrProvince,
        abbrCountry: i.abbrCountry,
        en: i.translations.find((j) => j.language === "ENGLISH").name,
        fr: i.translations.find((j) => j.language === "FRENCH").name,
      };
    });

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
        .status(500)
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

    await prisma.opSchools.create({
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

    await prisma.opSchools.update({
      where: {
        id,
      },
      data: {
        abbrCountry,
        abbrProvince,
        translations: {
          create: translations,
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

    const { id } = request.query;

    await prisma.opTransSchools.deleteMany({
      where: {
        opSchoolsId: id,
      },
    });

    await prisma.opSchools.deleteMany({
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

    const { ids } = request.query;

    await prisma.opSchools.deleteMany({
      where: {
        id: ids,
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
