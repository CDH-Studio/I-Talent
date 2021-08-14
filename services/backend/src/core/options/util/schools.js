const _ = require("lodash");
const prisma = require("../../../database");

async function getSchools(request, response) {
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

  const responseData = schoolsQuery.map((school) => ({
    value: school.opSchoolId,
    label: school.name,
  }));

  response.status(200).json(responseData);
}

async function getSchoolsAllLang(request, response) {
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
}

async function createSchool(request, response) {
  const { abbrCountry, abbrProvince, en, fr } = request.body;

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

  response.sendStatus(201);
}

async function updateSchool(request, response) {
  const { id, abbrCountry, abbrProvince, en, fr } = request.body;

  const savedTranslations = await prisma.opSchool
    .findUnique({
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

  response.sendStatus(204);
}

async function deleteSchool(request, response) {
  const { id } = request.body;

  await prisma.$transaction([
    prisma.opTransSchool.deleteMany({
      where: {
        opSchoolId: id,
      },
    }),
    prisma.opSchool.delete({
      where: {
        id,
      },
    }),
  ]);

  response.sendStatus(204);
}

async function deleteSchools(request, response) {
  const { ids } = request.body;

  await prisma.$transaction([
    prisma.opTransSchool.deleteMany({
      where: {
        opSchoolId: {
          in: ids,
        },
      },
    }),
    prisma.opSchool.deleteMany({
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
  getSchools,
  getSchoolsAllLang,
  createSchool,
  updateSchool,
  deleteSchool,
  deleteSchools,
};
