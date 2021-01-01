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
} = require("../../core/options");
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
const { validationMiddleware } = require("../../utils/middleware");

const { keycloak } = require("../../auth/keycloak");

const optionsRouter = Router();

optionsRouter.get(
  "/branches",
  keycloak.protect(),
  langValidator,
  validationMiddleware,
  branches.getBranches
);

optionsRouter.get(
  "/careerMobilities",
  keycloak.protect(),
  langValidator,
  validationMiddleware,
  careerMobilities.getCareerMobilities
);

optionsRouter
  .route("/categories")
  .get(
    keycloak.protect(),
    langValidator,
    validationMiddleware,
    categories.getCategories
  )
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    validationMiddleware,
    categories.deleteCategories
  );
optionsRouter
  .route("/category")
  .all(keycloak.protect("manage-options"))
  .post(createValidator, validationMiddleware, categories.createCategory)
  .put(updateValidator, validationMiddleware, categories.updateCategory)
  .delete(deleteOneValidator, validationMiddleware, categories.deleteCategory);
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
    validationMiddleware,
    competencies.getCompetencies
  )
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    validationMiddleware,
    competencies.deleteCompetencies
  );
optionsRouter
  .route("/competency")
  .all(keycloak.protect("manage-options"))
  .post(createValidator, validationMiddleware, competencies.createCompetency)
  .put(updateValidator, validationMiddleware, competencies.updateCompetency)
  .delete(
    deleteOneValidator,
    validationMiddleware,
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
  validationMiddleware,
  developmentalGoals.getDevelopmentalGoals
);

optionsRouter
  .route("/diplomas")
  .get(
    keycloak.protect(),
    langValidator,
    validationMiddleware,
    diplomas.getDiplomas
  )
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    validationMiddleware,
    diplomas.deleteDiplomas
  );
optionsRouter
  .route("/diploma")
  .all(keycloak.protect("manage-options"))
  .post(createValidator, validationMiddleware, diplomas.createDiploma)
  .put(updateValidator, validationMiddleware, diplomas.updateDiploma)
  .delete(deleteOneValidator, validationMiddleware, diplomas.deleteDiploma);
optionsRouter.get(
  "/diplomasAllLang",
  keycloak.protect("view-admin-console"),
  diplomas.getDiplomasAllLang
);

optionsRouter.get(
  "/locations",
  keycloak.protect(),
  langValidator,
  validationMiddleware,
  locations.getLocations
);

optionsRouter.get(
  "/cityLocations",
  keycloak.protect(),
  langValidator,
  validationMiddleware,
  cityLocations.getCityLocations
);

optionsRouter.get(
  "/lookingJobs",
  keycloak.protect(),
  langValidator,
  validationMiddleware,
  lookingJobs.getLookingJobs
);

optionsRouter
  .route("/schools")
  .get(
    keycloak.protect(),
    langValidator,
    validationMiddleware,
    schools.getSchools
  )
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    validationMiddleware,
    schools.deleteSchools
  );
optionsRouter
  .route("/school")
  .all(keycloak.protect("manage-options"))
  .post(createSchoolValidator, validationMiddleware, schools.createSchool)
  .put(updateSchoolValidator, validationMiddleware, schools.updateSchool)
  .delete(deleteOneValidator, validationMiddleware, schools.deleteSchool);
optionsRouter.get(
  "/schoolsAllLang",
  keycloak.protect("view-admin-console"),
  schools.getSchoolsAllLang
);

optionsRouter.get(
  "/securityClearances",
  keycloak.protect(),
  langValidator,
  validationMiddleware,
  securityClearances.getSecurityClearances
);

optionsRouter
  .route("/skills")
  .get(
    keycloak.protect(),
    langValidator,
    validationMiddleware,
    skills.getSkills
  )
  .delete(
    keycloak.protect("manage-options"),
    deleteManyValidator,
    validationMiddleware,
    skills.deleteSkills
  );
optionsRouter
  .route("/skill")
  .all(keycloak.protect("manage-options"))
  .post(createSkillValidator, validationMiddleware, skills.createSkill)
  .put(updateSkillValidator, validationMiddleware, skills.updateSkill)
  .delete(deleteOneValidator, validationMiddleware, skills.deleteSkill);
optionsRouter.get(
  "/skillsAllLang",
  keycloak.protect("view-admin-console"),
  skills.getSkillsAllLang
);

optionsRouter.get(
  "/talentMatrixResults",
  keycloak.protect(),
  langValidator,
  validationMiddleware,
  talentMatrixResults.getTalentMatrixResults
);

optionsRouter.get(
  "/tenures",
  keycloak.protect(),
  langValidator,
  validationMiddleware,
  tenures.getTenures
);

optionsRouter.get(
  "/attachmentNames",
  keycloak.protect(),
  [langValidator, attachmentNameValidator],
  validationMiddleware,
  linkAttachmentNames.getNames
);

module.exports = optionsRouter;
