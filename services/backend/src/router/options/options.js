const { Router } = require("express");
const options = require("../../core/options/options");

const optionsRouter = Router();

optionsRouter.get("/getBranch", options.getBranch);
optionsRouter.get("/getCareerMobility", options.getCareerMobility);
optionsRouter.get("/getCompetency", options.getCompetency);
optionsRouter.get("/getDevelopmentalGoals", options.getDevelopmentalGoals);
optionsRouter.get("/getDiploma", options.getDiploma);
optionsRouter.get("/getGroupLevel", options.getGroupLevel);
optionsRouter.get("/getKeyCompetency", options.getKeyCompetency);
optionsRouter.get("/getLocation", options.getLocation);
optionsRouter.get("/getSchool", options.getSchool);
optionsRouter.get("/getSecurityClearance", options.getSecurityClearance);
optionsRouter.get("/getCategory", options.getCategory);
optionsRouter.get("/getCategorySkills", options.getCategorySkills);
optionsRouter.get("/getSkill", options.getSkill);
optionsRouter.get("/getMentorshipSkill", options.getSkill);
optionsRouter.get("/getTalentMatrixResult", options.getTalentMatrixResult);
optionsRouter.get("/getTenure", options.getTenure);
optionsRouter.get("/getLookingForANewJob", options.getLookingForANewJob);
optionsRouter.get("/getWillingToRelocateTo", options.getWillingToRelocateTo);

module.exports = optionsRouter;
