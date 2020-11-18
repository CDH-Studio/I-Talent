const { Router } = require("express");

const {
  branches,
  careerMobilities,
  categories,
  cityLocations,
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
  linkAttachmentNames,
} = require("../../core/options/options");
const {
  deleteManyValidator,
  deleteOneValidator,
  createValidator,
  updateValidator,
  createSchoolValidator,
  updateSchoolValidator,
  createSkillValidator,
  updateSkillValidator,
  attachmentNameValidator,
} = require("./validator");

const { langValidator } = require("../util/commonValidators");
const { validationMiddlware } = require("../../utils/middlewares");

const { keycloak } = require("../../auth/keycloak");

const optionsRouter = Router();

optionsRouter.get(
  "/branches",
  keycloak.protect(),
  langValidator,
  validationMiddlware,
  branches.getBranches
);

optionsRouter.get(
  "/careerMobilities",
  keycloak.protect(),
  langValidator,
  validationMiddlware,
  careerMobilities.getCareerMobilities
);

optionsRouter
  .route("/categories")
  .get(
    keycloak.protect(),
    langValidator,
    validationMiddlware,
    categories.getCategories
  )
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    validationMiddlware,
    categories.deleteCategories
  );
optionsRouter
  .route("/category")
  .all(keycloak.protect("manage-options"))
  .post(createValidator, validationMiddlware, categories.createCategory)
  .put(updateValidator, validationMiddlware, categories.updateCategory)
  .delete(deleteOneValidator, validationMiddlware, categories.deleteCategory);
optionsRouter.get(
  "/categoriesAllLang",
  keycloak.protect("view-admin-console"),
  categories.getCategoriesAllLang
);

optionsRouter.get(
  "/classifications",
  keycloak.protect(),
  classifications.getClassifications
);

optionsRouter
  .route("/competencies")
  .get(
    keycloak.protect(),
    langValidator,
    validationMiddlware,
    competencies.getCompetencies
  )
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    validationMiddlware,
    competencies.deleteCompetencies
  );
optionsRouter
  .route("/competency")
  .all(keycloak.protect("manage-options"))
  .post(createValidator, validationMiddlware, competencies.createCompetency)
  .put(updateValidator, validationMiddlware, competencies.updateCompetency)
  .delete(
    deleteOneValidator,
    validationMiddlware,
    competencies.deleteCompetency
  );
optionsRouter.get(
  "/competenciesAllLang",
  keycloak.protect("view-admin-console"),
  competencies.getCompetenciesAllLang
);

optionsRouter.get(
  "/developmentalGoals",
  keycloak.protect(),
  langValidator,
  validationMiddlware,
  developmentalGoals.getDevelopmentalGoals
);

optionsRouter
  .route("/diplomas")
  .get(
    keycloak.protect(),
    langValidator,
    validationMiddlware,
    diplomas.getDiplomas
  )
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    validationMiddlware,
    diplomas.deleteDiplomas
  );
optionsRouter
  .route("/diploma")
  .all(keycloak.protect("manage-options"))
  .post(createValidator, validationMiddlware, diplomas.createDiploma)
  .put(updateValidator, validationMiddlware, diplomas.updateDiploma)
  .delete(deleteOneValidator, validationMiddlware, diplomas.deleteDiploma);
optionsRouter.get(
  "/diplomasAllLang",
  keycloak.protect("view-admin-console"),
  diplomas.getDiplomasAllLang
);

optionsRouter.get(
  "/locations",
  keycloak.protect(),
  langValidator,
  validationMiddlware,
  locations.getLocations
);

optionsRouter.get(
  "/cityLocations",
  keycloak.protect(),
  langValidator,
  validationMiddlware,
  cityLocations.getCityLocations
);

optionsRouter.get(
  "/lookingJobs",
  keycloak.protect(),
  langValidator,
  validationMiddlware,
  lookingJobs.getLookingJobs
);

optionsRouter
  .route("/schools")
  .get(
    keycloak.protect(),
    langValidator,
    validationMiddlware,
    schools.getSchools
  )
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    validationMiddlware,
    schools.deleteSchools
  );
optionsRouter
  .route("/school")
  .all(keycloak.protect("manage-options"))
  .post(createSchoolValidator, validationMiddlware, schools.createSchool)
  .put(updateSchoolValidator, validationMiddlware, schools.updateSchool)
  .delete(deleteOneValidator, validationMiddlware, schools.deleteSchool);
optionsRouter.get(
  "/schoolsAllLang",
  keycloak.protect("view-admin-console"),
  schools.getSchoolsAllLang
);

optionsRouter.get(
  "/securityClearances",
  keycloak.protect(),
  langValidator,
  validationMiddlware,
  securityClearances.getSecurityClearances
);

optionsRouter
  .route("/skills")
  .get(keycloak.protect(), langValidator, validationMiddlware, skills.getSkills)
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    validationMiddlware,
    skills.deleteSkills
  );
optionsRouter
  .route("/skill")
  .all(keycloak.protect("manage-options"))
  .post(createSkillValidator, validationMiddlware, skills.createSkill)
  .put(updateSkillValidator, validationMiddlware, skills.updateSkill)
  .delete(deleteOneValidator, validationMiddlware, skills.deleteSkill);
optionsRouter.get(
  "/skillsAllLang",
  keycloak.protect("view-admin-console"),
  skills.getSkillsAllLang
);

optionsRouter.get(
  "/talentMatrixResults",
  keycloak.protect(),
  langValidator,
  validationMiddlware,
  talentMatrixResults.getTalentMatrixResults
);
optionsRouter.get(
  "/tenures",
  keycloak.protect(),
  langValidator,
  validationMiddlware,
  tenures.getTenures
);

optionsRouter.get(
  "/attachmentNames",
  keycloak.protect(),
  [langValidator, attachmentNameValidator],
  validationMiddlware,
  linkAttachmentNames.getNames
);

module.exports = optionsRouter;
