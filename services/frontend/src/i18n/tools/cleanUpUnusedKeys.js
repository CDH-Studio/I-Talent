/**
 * Clean up unused i18n translations
 *
 * This script parses all react files to find translation keys in the i18n files that are unused.
 * Keys can be added to a ignoredKeys (ignoredKeys.json) to avoid false positives
 *
 * Logic for the next following functions comes from the answer of
 * https://stackoverflow.com/questions/48662924/javascript-nodejs-search-for-a-specific-word-string-in-files
 *
 * To Run:
 * 'yarn i18n:cleanup'
 */

/* eslint-disable no-console */
const _ = require("lodash");
const fs = require("fs").promises;
const path = require("path");
const testHelpers = require("./validationHelperFunctions");

// extract translations from file
const enTranslations = require("../en_CA.json");
const frTranslations = require("../fr_CA.json");

// get all ignoredKeys keys (keys to be ignored)
const ignoredKeys = require("../ignoredKeys.json");

/**
 * Overwrites the i18n files without the unused keys and saves them
 *
 * @param {object} enList  All english translations
 * @param {object} frList  All french translations
 * @param {string[]} allKeys  All translation keys in alphabetical order
 * @param {string[]} keysToRemove  Keys in the i18n files that are not being
 *                                 used inside the application
 * @returns {string[]}  Returns keys that only exited in one of the language
 *                      files so they were deleted
 */
const writeNewFiles = async (enList, frList, allKeys, keysToRemove) => {
  const newEn = {};
  const newFr = {};
  const badKeys = [];

  allKeys.forEach((key) => {
    if (!_.includes(keysToRemove, key)) {
      if (enList[key] !== undefined && frList[key] !== undefined) {
        newEn[key] = enList[key];
        newFr[key] = frList[key];
      } else {
        badKeys.push(key);
      }
    }
  });

  await fs.writeFile(
    path.join(__dirname, "../en_CA.json"),
    JSON.stringify(newEn, null, 2),
    "utf8"
  );
  await fs.writeFile(
    path.join(__dirname, "../fr_CA.json"),
    JSON.stringify(newFr, null, 2),
    "utf8"
  );

  return badKeys;
};

/**
 * Main Code
 *
 * Find unused i18n keys in the project and clean up the translation list
 */
(async () => {
  console.log("\n************ Starting i18n Clean Up ****************\n");

  const enKeys = Object.keys(enTranslations);
  const frKeys = Object.keys(frTranslations);
  const allKeys = _([...enKeys, ...frKeys])
    .uniq()
    .sort()
    .value();

  const unusedKeys = await testHelpers.findUnusedTranslations(
    path.join(__dirname, "../.."),
    [".jsx"],
    allKeys,
    ignoredKeys
  );

  // Print any unused keys
  if (unusedKeys.length > 0) {
    console.log(
      `${unusedKeys.length} keys are not being used in the app (they will be removed):`,
      unusedKeys
    );

    // rewrite files without unused keys
    const unmatchedKeys = await writeNewFiles(
      enTranslations,
      frTranslations,
      allKeys,
      unusedKeys
    );

    // Print any problematic keys
    if (unmatchedKeys.length) {
      console.error(
        `${unmatchedKeys.length} keys that are used in the app only had translation in one language (they will be removed). PLEASE manually inspect these:`,
        unmatchedKeys
      );
    }
  } else {
    console.log("All keys in en_CA and fr_CA files are used in the project!");
  }

  console.log("************ Done i18n Clean Up ****************\n");
})();
