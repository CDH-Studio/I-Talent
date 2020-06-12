const { Router } = require("express");
const options = require("../../core/options/options");

const optionsRouter = Router();

optionsRouter.get("/branches", options.getBranches);
optionsRouter.get("/careerMobilities", options.getCareerMobilities);
optionsRouter.get("/competencies", options.getCompetencies);
optionsRouter.get("/developmentalGoals", options.getDevelopmentalGoals);
optionsRouter.get("/diplomas", options.getDiplomas);
optionsRouter.get("/classfications", options.getClassfications);
optionsRouter.get("/locations", options.getLocations);
optionsRouter.get("/schools", options.getSchools);
optionsRouter.get("/securityClearances", options.getSecurityClearance);
optionsRouter.get("/categories", options.getCategories);
optionsRouter.get("/categoriesSkills", options.getCategoriesSkills);
optionsRouter.get("/skills", options.getSkills);
optionsRouter.get("/talentMatrixResults", options.getTalentMatrixResults);
optionsRouter.get("/tenures", options.getTenures);
optionsRouter.get("/lookingJobs", options.getLookingJobs);

module.exports = optionsRouter;
