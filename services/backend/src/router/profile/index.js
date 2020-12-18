const { Router } = require("express");

const careerMobilityRouter = require("./careerMobility");
const classificationRouter = require("./classification");
const competenciesRouter = require("./competencies");

const profileRouter = Router();

profileRouter.use("/:userId/careerMobility", careerMobilityRouter);
profileRouter.use("/:userId/classification", classificationRouter);
profileRouter.use("/:userId/competencies", competenciesRouter);
// profileRouter.use("/:userId/developmentalGoals", developmentalGoalsRouter);
// profileRouter.use("/:userId/educations", educationsRouter);
// profileRouter.use("/:userId/experiences", experiencesRouter);
// profileRouter.use("/:userId/lookingJob", lookingJobRouter);
// profileRouter.use("/:userId/mentorshipSkills", mentorshipSkillsRouter);
// profileRouter.use("/:userId/officeLocation", officeLocationRouter);
// profileRouter.use("/:userId/qualifiedPools", qualifiedPoolsRouter);
// profileRouter.use("/:userId/relocationLocations", relocationLocationsRouter);
// profileRouter.use("/:userId/secondLangProfs", secondLangProfsRouter);
// profileRouter.use("/:userId/securityClearance", securityClearanceRouter);
// profileRouter.use("/:userId/skills", skillsRouter);
// profileRouter.use("/:userId/talentMatrixResult", talentMatrixResultRouter);
// profileRouter.use("/:userId/tenure", tenureRouter);
// profileRouter.use("/:userId/visibility", visibilityRouter);

module.exports = profileRouter;
