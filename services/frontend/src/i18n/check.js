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
const unusedTransCleaner = require("./cleanUpUnusedKeys");

const en = require("./en_CA.json");
const fr = require("./fr_CA.json");

const blacklistedKeys = require("./blacklistKeys");

/**
 * search for duplicate translations values
 *
 * @param {object} enTranslations List of english translations
 * @param {object} frTranslations List of english translations
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

  if (enDuplicateValues.length === 0 && frDuplicateValues.length === 0) {
    console.error("There a no duplicate values in the en_CA and fr_CA files!");
    process.exit();
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
    process.exit(1);
  }
};

/**
 * Check for mismatched keys between en_CA.json and fr_CA.json
 *
 * @param {object} enTranslations List of english translations
 * @param {object} frTranslations List of english translations
 */
const findMismatchedTranslations = (enTranslations, frTranslations) => {
  const enKeys = Object.keys(enTranslations);
  const frKeys = Object.keys(frTranslations);

  if (!isEqual(enKeys, frKeys)) {
    const missingFrKeys = difference(enKeys, frKeys);
    const missingEnKeys = difference(frKeys, enKeys);

    console.error(
      `${missingFrKeys.length} keys that are in en_CA, but not in fr_CA:`,
      missingFrKeys
    );
    console.error(
      `${missingEnKeys.length} keys that are in fr_CA, but not in en_CA:`,
      missingEnKeys
    );
    console.error(
      "\nThe en_CA and fr_CA files don't have the same keys! Please fix i18n files manually or with 'yarn i18n:cleanup' in the frontend project"
    );

    process.exit(1);
  } else {
    console.error("The en_CA and fr_CA files have the same keys!");
    process.exit();
  }
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

  if (unusedKeys) {
    console.error(
      `${unusedKeys.length} keys that are unused in the project found`,
      unusedKeys
    );
  } else {
    console.error("All keys in en_CA and fr_CA files are used in the project!");
    process.exit();
  }
};

/**
 * Main Code
 *
 * Run checks to validate i18n files
 */
async () => {
  console.log("\n************ Starting i18n Validator ****************\n");

  // Remove all blacklisted key from the check
  blacklistedKeys.forEach((e) => delete en[e]);
  blacklistedKeys.forEach((e) => delete fr[e]);

  findUnusedTranslations(en, fr);
  findMismatchedTranslations(en, fr);
  findDuplicateTranslations(en, fr);

  console.log("************ Done i18n Validator ****************\n");
};
