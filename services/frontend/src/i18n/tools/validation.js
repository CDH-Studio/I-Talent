/**
 * Check validity of i18n Translations
 *
 * This script runs a series of tests to check if i18n files are valid.
 * The two implemented tests are:
 * 1) check if the same word has been translated twice (findDuplicateTranslations)
 * 2) check if the english and french files have mismatching keys (findMismatchedTranslations)
 * 3) check if all i18n keys are used the project (findUnusedTranslations)
 *
 * To Run:
 * 'yarn i18n:validate'
 */

/* eslint-disable no-console */
const testHelpers = require("./validationHelperFunctions");
const en = require("../en_CA.json");
const fr = require("../fr_CA.json");

const blacklistedKeys = require("../blacklistKeys.json");

/**
 * Main Code
 *
 * Run checks to validate i18n files
 */
(async () => {
  console.log("\n************ Starting i18n Validator ****************\n");

  // Remove all blacklisted key from the check
  blacklistedKeys.forEach((key) => delete en[key]);
  blacklistedKeys.forEach((key) => delete fr[key]);

  const duplicatedTranslations = testHelpers.findDuplicateTranslations(en, fr);
  const mismatchedTransKeys = testHelpers.findMismatchedTranslations(en, fr);
  const unusedTranslations = await testHelpers.findUnusedTranslations(en, fr);
  const areTransKeysAlphabetized = testHelpers.checkTransKeysOrder(en, fr);

  if (
    duplicatedTranslations.en.length ||
    duplicatedTranslations.fr.length ||
    mismatchedTransKeys.extraKeysInEn.length ||
    mismatchedTransKeys.extraKeysInFr.length ||
    unusedTranslations.length ||
    !areTransKeysAlphabetized
  ) {
    console.error("Summary: I18n Validator FAILED =========\n");
    process.exit(1);
  } else {
    console.error("Summary: I18n Validator PASSED =========\n");
    process.exit(0);
  }
})();
