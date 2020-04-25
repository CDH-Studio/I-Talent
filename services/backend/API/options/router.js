const { Router } = require("express");
const {
  getBranch,
  getCareerMobility,
  getCompetency,
  getDevelopmentalGoals,
  getDiploma,
  getGroupLevel,
  getKeyCompetency,
  getLocation,
  getSchool,
  getSecurityClearance,
  getCategory,
  getCategorySkills,
  getSkill,
  getTalentMatrixResult,
  getTenure,
  getLookingForANewJob,
  getWillingToRelocateTo,
} = require("./get");

const optionRouter = Router();

optionRouter.get("/getBranch", getBranch);
optionRouter.get("/getCareerMobility", getCareerMobility);
optionRouter.get("/getCompetency", getCompetency);
optionRouter.get("/getDevelopmentalGoals", getDevelopmentalGoals);
optionRouter.get("/getDiploma", getDiploma);
optionRouter.get("/getGroupLevel", getGroupLevel);
optionRouter.get("/getKeyCompetency", getKeyCompetency);
optionRouter.get("/getLocation", getLocation);
optionRouter.get("/getSchool", getSchool);
optionRouter.get("/getSecurityClearance", getSecurityClearance);
optionRouter.get("/getCategory", getCategory);
optionRouter.get("/getCategorySkills", getCategorySkills);
optionRouter.get("/getSkill", getSkill);
optionRouter.get("/getMentorshipSkill", getSkill);
optionRouter.get("/getTalentMatrixResult", getTalentMatrixResult);
optionRouter.get("/getTenure", getTenure);
optionRouter.get("/getLookingForANewJob", getLookingForANewJob);
optionRouter.get("/getWillingToRelocateTo", getWillingToRelocateTo);

module.exports = optionRouter;
