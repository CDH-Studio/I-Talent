const Sequelize = require("sequelize");
const {
  profile,
  careerMobility,
  category,
  diploma,
  groupLevel,
  keyCompetency,
  location,
  school,
  securityClearance,
  skill,
  talentMatrixResult,
  tenure,
  lookingForANewJob,
} = require("../../database/models");

async function getBranch(request, response) {
  const all = await profile.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("branchEn")), "branchEn"],
      "branchFr",
    ],
  });

  const resBody = all.map((one) => {
    return {
      description: { en: one.dataValues.branchEn, fr: one.dataValues.branchFr },
    };
  });
  response.status(200).json(resBody);
}

async function getCareerMobility(request, response) {
  const all = await careerMobility.findAll();
  const resBody = all.map((one) => {
    return {
      id: one.id,
      description: {
        en: one.dataValues.descriptionEn,
        fr: one.dataValues.descriptionFr,
      },
    };
  });
  response.status(200).json(resBody);
}

async function getCompetency(request, response) {
  const all = await skill.findAll({
    where: {
      type: "competency",
    },
  });
  const resBody = all.map((one) => {
    return {
      id: one.id,
      description: {
        en: one.dataValues.descriptionEn,
        fr: one.dataValues.descriptionFr,
      },
    };
  });
  response.status(200).json(resBody);
}

async function getDevelopmentalGoals(request, response) {
  const all = await skill.findAll();
  const resBody = all.map((one) => {
    return {
      id: one.id,
      description: {
        en: one.dataValues.descriptionEn,
        fr: one.dataValues.descriptionFr,
      },
    };
  });
  response.status(200).json(resBody);
}

async function getDiploma(request, response) {
  const all = await diploma.findAll();
  const resBody = all.map((one) => {
    return {
      id: one.id,
      description: {
        en: one.dataValues.descriptionEn,
        fr: one.dataValues.descriptionFr,
      },
    };
  });
  response.status(200).json(resBody);
}

async function getGroupLevel(request, response) {
  const all = await groupLevel.findAll();
  const resBody = all.map((one) => {
    return {
      id: one.dataValues.id,
      description: one.dataValues.description,
    };
  });
  response.status(200).json(resBody);
}

async function getKeyCompetency(request, response) {
  const all = await keyCompetency.findAll();
  const resBody = all.map((one) => {
    return {
      id: one.id,
      description: {
        en: one.dataValues.descriptionEn,
        fr: one.dataValues.descriptionFr,
      },
    };
  });
  response.status(200).json(resBody);
}

async function getLocation(request, response) {
  const all = await location.findAll();
  const resBody = all.map((one) => {
    return {
      id: one.id,
      description: {
        en: `${one.dataValues.addressEn}, ${one.dataValues.city}, ${one.dataValues.provinceEn}`,
        fr: `${one.dataValues.addressFr}, ${one.dataValues.city}, ${one.dataValues.provinceFr}`,
      },
    };
  });
  response.status(200).json(resBody);
}

async function getSchool(request, response) {
  const all = await school.findAll();
  const resBody = all.map((one) => {
    return {
      id: one.dataValues.id,
      description: one.dataValues.description,
    };
  });
  response.status(200).json(resBody);
}

async function getSecurityClearance(request, response) {
  const all = await securityClearance.findAll();
  const resBody = all.map((one) => {
    return {
      id: one.dataValues.id,
      description: {
        en: one.dataValues.descriptionEn,
        fr: one.dataValues.descriptionFr,
      },
    };
  });
  response.status(200).json(resBody);
}

async function getCategorySkills(request, response) {
  const all = await category.findAll({
    include: skill,
    attributes: ["descriptionEn", "descriptionFr", "id"],
    require: true,
  });
  const resBody = all.map((one) => {
    const skillsList = one.dataValues.skills.map((skillCat) => {
      if (skillCat.dataValues.categoryId === one.dataValues.id) {
        return {
          id: skillCat.dataValues.id,
          description: {
            en: skillCat.dataValues.en,
            fr: skillCat.dataValues.fr,
          },
        };
      }
      return {
        id: skillCat.dataValues.id,
        description: { en: null, fr: null },
      };
    });
    return {
      aCategory: {
        category: {
          id: one.id,
          description: { en: one.descriptionEn, fr: one.descriptionFr },
          skillsList,
        },
      },
    };
  });
  response.status(200).json(resBody);
}

async function getCategory(request, response) {
  const all = await category.findAll({
    include: skill,
    attributes: ["descriptionEn", "descriptionFr", "id"],
    require: true,
  });
  const resBody = all.map((one) => {
    const skillsCat = one.dataValues.skills.map((skillCat) => {
      if (skillCat.categoryId === one.dataValues.id) {
        return {
          id: skillCat.dataValues.id,
          description: {
            en: skillCat.dataValues.descriptionEn,
            fr: skillCat.dataValues.descriptionFr,
          },
        };
      }
      return {
        id: skillCat.dataValues.id,
        description: { en: null, fr: null },
      };
    });
    return {
      id: one.dataValues.id,
      description: {
        en: one.dataValues.descriptionEn,
        fr: one.dataValues.descriptionFr,
      },
      skills: skillsCat,
    };
  });
  response.status(200).json(resBody);
}

async function getSkill(request, response) {
  const all = await skill.findAll({
    include: category,
    attributes: ["descriptionEn", "descriptionFr", "id"],
    require: true,
    where: {
      type: "skill",
    },
  });
  const resBody = all.map((one) => {
    return {
      id: one.dataValues.id,
      description: {
        en: one.dataValues.descriptionEn,
        fr: one.dataValues.descriptionFr,
      },
    };
  });
  response.status(200).json(resBody);
}

async function getTalentMatrixResult(request, response) {
  const all = await talentMatrixResult.findAll();
  const resBody = all.map((one) => {
    return {
      id: one.dataValues.id,
      description: {
        en: one.dataValues.descriptionEn,
        fr: one.dataValues.descriptionFr,
      },
    };
  });
  response.status(200).json(resBody);
}

async function getTenure(request, response) {
  const all = await tenure.findAll();
  const resBody = all.map((one) => {
    return {
      id: one.dataValues.id,
      description: {
        en: one.dataValues.descriptionEn,
        fr: one.dataValues.descriptionFr,
      },
    };
  });
  response.status(200).json(resBody);
}

async function getLookingForANewJob(request, response) {
  try {
    const all = await lookingForANewJob.findAll();
    const resBody = all.map((element) => ({
      id: element.id,
      description: {
        en: element.descriptionEn,
        fr: element.descriptionFr,
      },
    }));
    response.status(200).json(resBody);
  } catch (error) {
    response.status(500).json(error.message);
  }
}

async function getWillingToRelocateTo(request, response) {
  try {
    const all = await location.findAll({
      attributes: [
        [
          Sequelize.fn("MIN", Sequelize.cast(Sequelize.col("id"), "varchar")),
          "id",
        ],
        "city",
        "provinceEn",
        "provinceFr",
      ],
      group: ["city", "provinceEn", "provinceFr"],
      order: [
        ["provinceEn", "ASC"],
        ["city", "ASC"],
      ],
    });
    const resBody = all.map((one) => {
      return {
        id: one.dataValues.id,
        description: {
          en: `${one.dataValues.city}, ${one.dataValues.provinceEn}`,
          fr: `${one.dataValues.city}, ${one.dataValues.provinceFr}`,
        },
      };
    });
    response.status(200).json(resBody);
  } catch (error) {
    response.status(500).json(error.message);
  }
}

module.exports = {
  getBranch,
  getCareerMobility,
  getCompetency,
  getDevelopmentalGoals,
  getDiploma,
  getGroupLevel,
  getKeyCompetency,
  getLocation,
  getCategory,
  getSchool,
  getSecurityClearance,
  getCategorySkills,
  getSkill,
  getTalentMatrixResult,
  getTenure,
  getLookingForANewJob,
  getWillingToRelocateTo,
};
