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
} = require("../../core/options/options");

const optionsRouter = Router();

optionsRouter.get("/getBranch", getBranch);
optionsRouter.get("/getCareerMobility", getCareerMobility);
optionsRouter.get("/getCompetency", getCompetency);
optionsRouter.get("/getDevelopmentalGoals", getDevelopmentalGoals);
optionsRouter.get("/getDiploma", getDiploma);
optionsRouter.get("/getGroupLevel", getGroupLevel);
optionsRouter.get("/getKeyCompetency", getKeyCompetency);
optionsRouter.get("/getLocation", getLocation);
optionsRouter.get("/getSchool", getSchool);
optionsRouter.get("/getSecurityClearance", getSecurityClearance);
optionsRouter.get("/getCategory", getCategory);
optionsRouter.get("/getCategorySkills", getCategorySkills);
optionsRouter.get("/getSkill", getSkill);
optionsRouter.get("/getMentorshipSkill", getSkill);
optionsRouter.get("/getTalentMatrixResult", getTalentMatrixResult);
optionsRouter.get("/getTenure", getTenure);
optionsRouter.get("/getLookingForANewJob", getLookingForANewJob);
optionsRouter.get("/getWillingToRelocateTo", getWillingToRelocateTo);

module.exports = optionsRouter;
