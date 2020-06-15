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
const {
  langValidator,
  deleteManyValidator,
  deleteOneValidator,
  createValidator,
  updateValidator,
  createSchoolValidator,
  updateSchoolValidator,
  createSkillValidator,
  updateSkillValidator,
} = require("./validator");
const { keycloak } = require("../../auth/keycloak");

const optionsRouter = Router();

optionsRouter.get("/branches", langValidator, branches.getBranches);

optionsRouter.get(
  "/careerMobilities",
  langValidator,
  careerMobilities.getCareerMobilities
);

optionsRouter
  .route("/categories")
  .get(langValidator, categories.getCategories)
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    categories.deleteCategories
  );
optionsRouter
  .route("/category")
  .post(
    keycloak.protect("manage-options"),
    createValidator,
    categories.createCategory
  )
  .put(
    keycloak.protect("manage-options"),
    updateValidator,
    categories.updateCategory
  )
  .delete(
    keycloak.protect("manage-options"),
    deleteOneValidator,
    categories.deleteCategory
  );
optionsRouter.get("/categoriesAllLang", categories.getCategoriesAllLang);
optionsRouter.get(
  "/categoriesSkills",
  keycloak.protect("view-admin-console"),
  langValidator,
  categories.getCategoriesSkills
);

optionsRouter.get("/classfications", classifications.getClassifications);

optionsRouter
  .route("/competencies")
  .get(langValidator, competencies.getCompetencies)
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    competencies.deleteCompetencies
  );
optionsRouter
  .route("/competency")
  .post(
    keycloak.protect("manage-options"),
    createValidator,
    competencies.createCompetency
  )
  .put(
    keycloak.protect("manage-options"),
    updateValidator,
    competencies.updateCompetency
  )
  .delete(
    keycloak.protect("manage-options"),
    deleteOneValidator,
    competencies.deleteCompetency
  );
optionsRouter.get(
  "/competenciesAllLang",
  keycloak.protect("view-admin-console"),
  competencies.getCompetenciesAllLang
);

optionsRouter.get(
  "/developmentalGoals",
  langValidator,
  developmentalGoals.getDevelopmentalGoals
);

optionsRouter
  .route("/diplomas")
  .get(langValidator, diplomas.getDiplomas)
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    diplomas.deleteDiplomas
  );
optionsRouter
  .route("/diploma")
  .post(
    keycloak.protect("manage-options"),
    createValidator,
    diplomas.createDiploma
  )
  .put(
    keycloak.protect("manage-options"),
    updateValidator,
    diplomas.updateDiploma
  )
  .delete(
    keycloak.protect("manage-options"),
    deleteOneValidator,
    diplomas.deleteDiploma
  );
optionsRouter.get(
  "/diplomasAllLang",
  keycloak.protect("view-admin-console"),
  diplomas.getDiplomasAllLang
);

optionsRouter.get("/locations", langValidator, locations.getLocations);

optionsRouter.get("/lookingJobs", langValidator, lookingJobs.getLookingJobs);

optionsRouter
  .route("/schools")
  .get(langValidator, schools.getSchools)
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    schools.deleteSchools
  );
optionsRouter
  .route("/school")
  .post(
    keycloak.protect("manage-options"),
    createSchoolValidator,
    schools.createSchool
  )
  .put(
    keycloak.protect("manage-options"),
    updateSchoolValidator,
    schools.updateSchool
  )
  .delete(
    keycloak.protect("manage-options"),
    deleteOneValidator,
    schools.deleteSchool
  );
optionsRouter.get(
  "/schoolsAllLang",
  keycloak.protect("view-admin-console"),
  schools.getSchoolsAllLang
);

optionsRouter.get(
  "/securityClearances",
  langValidator,
  securityClearances.getSecurityClearances
);

optionsRouter
  .route("/skills")
  .get(langValidator, skills.getSkills)
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    skills.deleteSkills
  );
optionsRouter
  .route("/skill")
  .post(
    keycloak.protect("manage-options"),
    createSkillValidator,
    skills.createSkill
  )
  .put(
    keycloak.protect("manage-options"),
    updateSkillValidator,
    skills.updateSkill
  )
  .delete(
    keycloak.protect("manage-options"),
    deleteOneValidator,
    skills.deleteSkill
  );
optionsRouter.get(
  "/skillsAllLang",
  keycloak.protect("view-admin-console"),
  skills.getSkillsAllLang
);

optionsRouter.get(
  "/talentMatrixResults",
  langValidator,
  talentMatrixResults.getTalentMatrixResults
);
optionsRouter.get("/tenures", langValidator, tenures.getTenures);

module.exports = optionsRouter;
