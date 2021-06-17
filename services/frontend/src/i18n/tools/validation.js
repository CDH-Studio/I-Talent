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

const { validate } = require("./validationHelperFunctions");

/**
 * Main Code
 *
 * Runs the validation
 */
(async () => {
  const value = await validate();
  if (value) process.exit(0);
  process.exit(1);
})();
