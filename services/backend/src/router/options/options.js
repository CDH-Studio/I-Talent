const { Router } = require("express");
const {
  branches,
  careerMobilities,
  categories,
  classifications,
  competencies,
  developmentalGoals,
  diplomas,
  locations,
  lookingJobs,
  schools,
  securityClearances,
  skills,
  talentMatrixResults,
  tenures,
} = require("../../core/options/options");
const { keycloak } = require("../../auth/keycloak");

const optionsRouter = Router();

optionsRouter.get("/branches", branches.getBranches);

optionsRouter.get("/careerMobilities", careerMobilities.getCareerMobilities);

optionsRouter
  .route("/categories")
  .get(categories.getCategories)
  .delete(keycloak.protect("manage-options"), categories.deleteCategories);
optionsRouter
  .route("/category")
  .post(keycloak.protect("manage-options"), categories.createCategory)
  .put(keycloak.protect("manage-options"), categories.updateCategory)
  .delete(keycloak.protect("manage-options"), categories.deleteCategory);
optionsRouter.get("/categoriesAllLang", categories.getCategoriesAllLang);
optionsRouter.get(
  "/categoriesSkills",
  keycloak.protect("view-admin-console"),
  categories.getCategoriesSkills
);

optionsRouter.get("/classfications", classifications.getClassfications);

optionsRouter
  .route("/competencies")
  .get(competencies.getCompetencies)
  .delete(keycloak.protect("manage-options"), competencies.deleteCompetencies);
optionsRouter
  .route("/competency")
  .post(keycloak.protect("manage-options"), competencies.createCategory)
  .put(keycloak.protect("manage-options"), competencies.updateCompetency)
  .delete(keycloak.protect("manage-options"), competencies.deleteCompetency);
optionsRouter.get(
  "/competenciesAllLang",
  keycloak.protect("view-admin-console"),
  competencies.getCompetenciesAllLang
);

optionsRouter.get(
  "/developmentalGoals",
  developmentalGoals.getDevelopmentalGoals
);

optionsRouter
  .route("/diplomas")
  .get(diplomas.getDiplomas)
  .delete(keycloak.protect("manage-options"), diplomas.deleteDiplomas);
optionsRouter
  .route("/diploma")
  .post(keycloak.protect("manage-options"), diplomas.createDiploma)
  .put(keycloak.protect("manage-options"), diplomas.updateDiploma)
  .delete(keycloak.protect("manage-options"), diplomas.deleteDiploma);
optionsRouter.get(
  "/diplomasAllLang",
  keycloak.protect("view-admin-console"),
  diplomas.getDiplomasAllLang
);

optionsRouter.get("/locations", locations.getLocations);

optionsRouter.get("/lookingJobs", lookingJobs.getLookingJobs);

optionsRouter
  .route("/schools")
  .get(schools.getSchools)
  .delete(keycloak.protect("manage-options"), schools.deleteSchools);
optionsRouter
  .route("/school")
  .post(keycloak.protect("manage-options"), schools.createSchool)
  .put(keycloak.protect("manage-options"), schools.updateSchool)
  .delete(keycloak.protect("manage-options"), schools.deleteSchool);
optionsRouter.get(
  "/schoolsAllLang",
  keycloak.protect("view-admin-console"),
  schools.getSchoolsAllLang
);

optionsRouter.get(
  "/securityClearances",
  securityClearances.getSecurityClearances
);

optionsRouter
  .route("/skills")
  .get(skills.getSkills)
  .delete(keycloak.protect("manage-options"), skills.deleteSkills);
optionsRouter
  .route("/skill")
  .post(keycloak.protect("manage-options"), skills.createSkill)
  .put(keycloak.protect("manage-options"), skills.updateSkill)
  .delete(keycloak.protect("manage-options"), skills.deleteSkill);
optionsRouter.get(
  "/skillsAllLang",
  keycloak.protect("view-admin-console"),
  skills.getSkillsAllLang
);

optionsRouter.get(
  "/talentMatrixResults",
  talentMatrixResults.getTalentMatrixResults
);
optionsRouter.get("/tenures", tenures.getTenures);

module.exports = optionsRouter;
