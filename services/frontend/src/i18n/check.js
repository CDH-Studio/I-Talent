/**
 * Check validity of i18n Translations
 *
 * This script runs a series of tests to check if i18n files are valid.
 * The two implemnted tests are:
 * 1) check if the same word has been trasnlated twice (findDuplicateTranslations)
 * 2) check if the neglish and french files have mismatching keys (findMismatchedTranslations)
 *
 *
 * To Run:
 * 'yarn i18n:check'
 */

/* eslint-disable no-console */
const { sortBy, difference, isEqual } = require("lodash");
//const unusedTransCleaner = require("./cleanUpUnusedKeys");
// from "./cleanUpUnusedKeys" import searchForUnusedKeysInFiles;

const en = require("./en_CA.json");
const fr = require("./fr_CA.json");

const blacklistedKeys = require("./blacklistKeys");

/**
 * search for duplicate translations values
 *
 * @param {object} enTranslations List of english translations
 * @param {object} frTranslations List of english translations
 * @returns {string[]}  Returns duplicated translation values
 */
const findDuplicateTranslations = (enTranslations, frTranslations) => {
  // function to check for duplicated in array
  const findDuplicates = (arr) =>
    arr.filter(
      (
        (s) => (v) =>
          s.has(v) || !s.add(v)
      )(new Set())
    );

  const enDuplicateValues = findDuplicates(Object.values(enTranslations));
  const frDuplicateValues = findDuplicates(Object.values(frTranslations));

  // Message to show test results
  if (enDuplicateValues.length === 0 && frDuplicateValues.length === 0) {
    console.error("There a no duplicate values in the en_CA and fr_CA files!");
    console.error("findDuplicateTranslations check: SUCCESS\n");
  } else {
    if (enDuplicateValues.length > 0) {
      console.error(
        `${enDuplicateValues.length} duplicate values are in en_CA:`,
        enDuplicateValues
      );
    }
    if (frDuplicateValues.length > 0) {
      console.error(
        `${frDuplicateValues.length} duplicate values are in fr_CA:`,
        frDuplicateValues
      );
    }
    console.error("findDuplicateTranslations check: FAIL\n");
  }

  return enDuplicateValues;
};

/**
 * Check for mismatched keys between en_CA.json and fr_CA.json
 *
 * @param {object} enTranslations List of english translations
 * @param {object} frTranslations List of english translations
 * @returns {object}  Returns mismatched translation keys
 */
const findMismatchedTranslations = (enTranslations, frTranslations) => {
  let mismatchedKeys = { extraKeysInEn: [], extraKeysInFr: [] };

  const enKeys = Object.keys(enTranslations);
  const frKeys = Object.keys(frTranslations);

  if (!isEqual(enKeys, frKeys)) {
    mismatchedKeys.extraKeysInEn = difference(enKeys, frKeys);
    mismatchedKeys.extraKeysInFr = difference(frKeys, enKeys);

    if (mismatchedKeys.extraKeysInFr.length > 0) {
      console.error(
        `${mismatchedKeys.extraKeysInFr.length} keys that are in en_CA, but not in fr_CA:`,
        mismatchedKeys.extraKeysInFr
      );
    }
    if (mismatchedKeys.extraKeysInEn.length > 0) {
      console.error(
        `${mismatchedKeys.extraKeysInEn.length} keys that are in fr_CA, but not in en_CA:`,
        mismatchedKeys.extraKeysInEn
      );
    }
    if (
      mismatchedKeys.extraKeysInFr.length > 0 ||
      mismatchedKeys.extraKeysInEn.length > 0
    ) {
      console.error(
        "The en_CA and fr_CA files don't have the same keys! Please fix i18n files manually or with 'yarn i18n:cleanup' in the frontend project"
      );
      console.error("findMismatchedTranslations check: FAIL\n");
    }
  } else {
    console.error("The en_CA and fr_CA files have the same keys!");
    console.error("findMismatchedTranslations check: SUCCESS\n");
  }
  return mismatchedKeys;
  // return
};

/**
 * Check for mismatched keys between en_CA.json and fr_CA.json
 *
 * @param {object} enTranslations List of english translations
 * @param {object} frTranslations List of english translations
 */
const findUnusedTranslations = async (enTranslations, frTranslations) => {
  const enKeys = Object.keys(enTranslations);
  const frKeys = Object.keys(frTranslations);

  const allKeys = _([...enKeys, ...frKeys])
    .uniq()
    .sort()
    .value();

  const unusedKeys = await unusedTransCleaner.searchForUnusedKeysInFiles(
    path.join(__dirname, ".."),
    [".jsx"],
    allKeys,
    blacklistedKeys
  );

  console.log(unusedKeys.length());
  if (unusedKeys.length === 0) {
    console.error(
      `${unusedKeys.length} keys that are unused in the project found`,
      unusedKeys
    );
    console.error("findUnusedTranslations check: FAIL\n");
    process.exit(1);
  } else {
    console.error("All keys in en_CA and fr_CA files are used in the project!");
    console.error("findUnusedTranslations check: SUCCESS\n");
    process.exit();
  }
};

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

  const duplicatedTranslations = findDuplicateTranslations(en, fr);
  const mismatchedTransKeys = findMismatchedTranslations(en, fr);

  if (
    duplicatedTranslations.length ||
    mismatchedTransKeys.extraKeysInEn.length ||
    mismatchedTransKeys.extraKeysInFr.length
  ) {
    console.error("\n========= I18n Validator FAILED =========\n");
    process.exit(1);
  } else {
    console.error("\n========= I18n Validator PASSED =========\n");
    process.exit(0);
  }

  // await findUnusedTranslations(en, fr);
  // try {
  // await findMismatchedTranslations(en, fr);

  //   process.exit(1);
  // } catch (e) {
  //   console.error(e.name); // logs 'Error'
  //   console.error(e.message); // logs 'The message', or a JavaScript error message
  // }

  console.log("************ Done i18n Validator ****************\n");
})();
