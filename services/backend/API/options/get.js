const Models = require("../../models");
const Sequelize = require("sequelize");
const Profile = Models.profile;
const CareerMobility = Models.careerMobility;
const Competency = Models.competency;
const Diploma = Models.diploma;
const GroupLevel = Models.groupLevel;
const KeyCompetency = Models.keyCompetency;
const Location = Models.location;
const School = Models.school;
const SecurityClearance = Models.securityClearance;
const Category = Models.category;
const Skill = Models.skill;
const TalentMatrixResult = Models.talentMatrixResult;
const Tenure = Models.tenure;
const LookingForANewJob = Models.lookingForANewJob;

const getBranch = async (request, response) => {
  let all = await Profile.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("branchEn")), "branchEn"],
      "branchFr"
    ]
  });

  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      description: { en: one.branchEn, fr: one.branchFr }
    };
  });
  response.status(200).json(resBody);
};

const getCareerMobility = async (request, response) => {
  let all = await CareerMobility.findAll();
  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      id: one.id,
      description: { en: one.descriptionEn, fr: one.descriptionFr }
    };
  });
  response.status(200).json(resBody);
};

const getCompetency = async (request, response) => {
  let all = await Skill.findAll({
    where: {
      type: "competency"
    }
  });
  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      id: one.id,
      description: { en: one.descriptionEn, fr: one.descriptionFr }
    };
  });
  response.status(200).json(resBody);
};

const getDevelopmentalGoals = async (request, response) => {
  let all = await Skill.findAll();
  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      id: one.id,
      description: { en: one.descriptionEn, fr: one.descriptionFr }
    };
  });
  response.status(200).json(resBody);
};

const getDiploma = async (request, response) => {
  let all = await Diploma.findAll();
  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      id: one.id,
      description: { en: one.descriptionEn, fr: one.descriptionFr }
    };
  });
  response.status(200).json(resBody);
};

const getGroupLevel = async (request, response) => {
  let all = await GroupLevel.findAll();
  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      id: one.id,
      description: one.description
    };
  });
  response.status(200).json(resBody);
};

const getKeyCompetency = async (request, response) => {
  let all = await KeyCompetency.findAll();
  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      id: one.id,
      description: { en: one.descriptionEn, fr: one.descriptionFr }
    };
  });
  response.status(200).json(resBody);
};

const getLocation = async (request, response) => {
  let all = await Location.findAll();
  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      id: one.id,
      description: {
        en: one.addressEn + ", " + one.city + ", " + one.provinceEn,
        fr: one.addressFr + ", " + one.city + ", " + one.provinceFr
      }
    };
  });
  response.status(200).json(resBody);
};

const getSchool = async (request, response) => {
  let all = await School.findAll();
  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      id: one.id,
      description: one.description
    };
  });
  response.status(200).json(resBody);
};

const getSecurityClearance = async (request, response) => {
  let all = await SecurityClearance.findAll();
  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      id: one.id,
      description: { en: one.descriptionEn, fr: one.descriptionFr }
    };
  });
  response.status(200).json(resBody);
};

const getCategory = async (request, response) => {
  let all = await Category.findAll();
  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      id: one.id,
      description: { en: one.descriptionEn, fr: one.descriptionFr }
    };
  });
  response.status(200).json(resBody);
};

const getSkill = async (request, response) => {
  let all = await Skill.findAll({
    where: {
      type: "skill"
    }
  });
  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      id: one.id,
      description: { en: one.descriptionEn, fr: one.descriptionFr },
      categoryId: one.categoryId
    };
  });
  response.status(200).json(resBody);
};

const getMentorshipSkill = async (request, response) => {
  let all = await Skill.findAll({
    where: {
      type: "skill"
    }
  });
  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      id: one.id,
      description: { en: one.descriptionEn, fr: one.descriptionFr },
      categoryId: one.categoryId
    };
  });
  response.status(200).json(resBody);
};

const getTalentMatrixResult = async (request, response) => {
  let all = await TalentMatrixResult.findAll();
  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      id: one.id,
      description: { en: one.descriptionEn, fr: one.descriptionFr }
    };
  });
  response.status(200).json(resBody);
};

const getTenure = async (request, response) => {
  let all = await Tenure.findAll();
  let resBody = all.map(one => {
    one = one.dataValues;
    return {
      id: one.id,
      description: { en: one.descriptionEn, fr: one.descriptionFr }
    };
  });
  response.status(200).json(resBody);
};

const getLookingForANewJob = async (request, response) => {
  try {
    let all = await LookingForANewJob.findAll();
    let resBody = all.map(element => ({
      id: element.id,
      description: {
        en: element.descriptionEn,
        fr: element.descriptionFr
      }
    }));
    response.status(200).json(resBody);
  } catch (error) {
    response.status(500).json(error.message);
  }
};

const getWillingToRelocateTo = async (request, response) => {
  try {
    let all = await Location.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("city")), "city"],
        "provinceEn",
        "provinceFr",
        "id"
      ]
    });
    let resBody = all.map(one => {
      one = one.dataValues;
      return {
        id: one.id,
        description: {
          en: one.city + ", " + one.provinceEn,
          fr: one.city + ", " + one.provinceFr
        }
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
  getCategory,
  getSkill,
  getMentorshipSkill,
  getTalentMatrixResult,
  getTenure,
  getLookingForANewJob,
  getWillingToRelocateTo
};
