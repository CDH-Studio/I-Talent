const Sequelize = require("sequelize");
const Models = require("../../models");

const Profile = Models.profile;
const CareerMobility = Models.careerMobility;
const Category = Models.category;
const Diploma = Models.diploma;
const GroupLevel = Models.groupLevel;
const KeyCompetency = Models.keyCompetency;
const Location = Models.location;
const School = Models.school;
const SecurityClearance = Models.securityClearance;
const Skill = Models.skill;
const TalentMatrixResult = Models.talentMatrixResult;
const Tenure = Models.tenure;
const LookingForANewJob = Models.lookingForANewJob;

const getBranch = async (request, response) => {
  const all = await Profile.findAll({
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
};

const getCareerMobility = async (request, response) => {
  const all = await CareerMobility.findAll();
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
};

const getCompetency = async (request, response) => {
  const all = await Skill.findAll({
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
};

const getDevelopmentalGoals = async (request, response) => {
  const all = await Skill.findAll();
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
};

const getDiploma = async (request, response) => {
  const all = await Diploma.findAll();
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
};

const getGroupLevel = async (request, response) => {
  const all = await GroupLevel.findAll();
  const resBody = all.map((one) => {
    return {
      id: one.dataValues.id,
      description: one.dataValues.description,
    };
  });
  response.status(200).json(resBody);
};

const getKeyCompetency = async (request, response) => {
  const all = await KeyCompetency.findAll();
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
};

const getLocation = async (request, response) => {
  const all = await Location.findAll();
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
};

const getSchool = async (request, response) => {
  const all = await School.findAll();
  const resBody = all.map((one) => {
    return {
      id: one.dataValues.id,
      description: one.dataValues.description,
    };
  });
  response.status(200).json(resBody);
};

const getSecurityClearance = async (request, response) => {
  const all = await SecurityClearance.findAll();
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
};

const getCategorySkills = async (request, response) => {
  const all = await Category.findAll({
    include: Skill,
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
};

const getCategory = async (request, response) => {
  const all = await Category.findAll({
    include: Skill,
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
};

const getSkill = async (request, response) => {
  const all = await Skill.findAll({
    include: Category,
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
};

const getTalentMatrixResult = async (request, response) => {
  const all = await TalentMatrixResult.findAll();
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
};

const getTenure = async (request, response) => {
  const all = await Tenure.findAll();
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
};

const getLookingForANewJob = async (request, response) => {
  try {
    const all = await LookingForANewJob.findAll();
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
};

const getWillingToRelocateTo = async (request, response) => {
  try {
    const all = await Location.findAll({
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
};

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
