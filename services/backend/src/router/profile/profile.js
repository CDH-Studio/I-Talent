const { Router } = require("express");
const { keycloak } = require("../../auth/keycloak");
const profile = require("../../core/profile/profile");

const { updateProfileValidator } = require("./validator");

const { langValidator, UUIDValidator } = require("../util/commonValidators");
const { validationMiddlware } = require("../../utils/middlewares");

const profileRouter = Router();

profileRouter
  .route("/:id")
  .all(keycloak.protect())
  .get(
    [UUIDValidator, langValidator],
    validationMiddlware,
    profile.getPublicProfileById
  )
  .put(
    [langValidator, UUIDValidator, updateProfileValidator],
    validationMiddlware,
    profile.updateProfile
  );

profileRouter
  .route("/private/:id")
  .get(
    keycloak.protect(),
    [UUIDValidator, langValidator],
    validationMiddlware,
    profile.getPrivateProfileById
  );

module.exports = profileRouter;
