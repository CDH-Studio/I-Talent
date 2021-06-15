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
const _ = require("lodash");
const path = require("path");
const testHelpers = require("./validationHelperFunctions");
const en = require("../en_CA.json");
const fr = require("../fr_CA.json");
const ignoredKeys = require("../ignoredKeys.json");

/**
 * Main Code
 *
 * Run checks to validate i18n files
 */
(async () => {
  console.log("\n************ Starting i18n Validator ****************\n");

  const enKeys = Object.keys(en);
  const frKeys = Object.keys(fr);
  const enValues = Object.values(en);
  const frValues = Object.values(fr);

  const uniqKeys = _([...enKeys, ...frKeys]).uniq();
  const allKeys = _(uniqKeys).value();
  const sortedKeys = _(uniqKeys).sort().value();

  const filesContent = await testHelpers.getFileContent(
    path.join(__dirname, "../.."),
    [".jsx"]
  );

  const [unusedTranslations, missingTranslations] = await Promise.all([
    testHelpers.findUnusedTranslations(filesContent, sortedKeys, ignoredKeys),
    testHelpers.findMissingTranslations(filesContent, sortedKeys, ignoredKeys),
  ]);

  const findMissingValuesInIgnoredFile =
    testHelpers.findMissingValuesInIgnoredFile(sortedKeys, ignoredKeys);

  const duplicatedTranslations = testHelpers.findDuplicateTranslations(
    enValues,
    frValues
  );
  const mismatchedTransKeys = testHelpers.findMismatchedTranslations(
    enKeys,
    frKeys
  );
  const areTransKeysAlphabetized = testHelpers.checkTransKeysOrder(
    sortedKeys,
    allKeys
  );

  if (
    duplicatedTranslations.en.length ||
    duplicatedTranslations.fr.length ||
    mismatchedTransKeys.extraKeysInEn.length ||
    mismatchedTransKeys.extraKeysInFr.length ||
    unusedTranslations.length ||
    missingTranslations.length ||
    findMissingValuesInIgnoredFile.length ||
    !areTransKeysAlphabetized
  ) {
    console.error("Summary: I18n Validator FAILED =========\n");
    process.exit(1);
  } else {
    console.error("Summary: I18n Validator PASSED =========\n");
    process.exit(0);
  }
})();
