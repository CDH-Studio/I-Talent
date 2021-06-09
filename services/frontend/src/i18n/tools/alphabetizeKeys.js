/**
 * Alphabetize i18n translations
 *
 * This script puts the i18n keys in alphabetical order.
 *
 * To Run:
 * 'yarn i18n:alphabetize'
 */

/* eslint-disable no-console */
const _ = require("lodash");
const fs = require("fs").promises;
const path = require("path");

// extract translations from file
const enTranslations = require("../en_CA.json");
const frTranslations = require("../fr_CA.json");

/**
 * Overwrites the i18n files
 *
 * @param {object} enList  All english translations
 * @param {object} frList  All french translations
 * @param {string[]} allOrderedKeys  All translation keys in alphabetical order
 */
const writeNewFiles = async (enList, frList, allOrderedKeys) => {
  const newEn = {};
  const newFr = {};

  allOrderedKeys.forEach((key) => {
    newEn[key] = enList[key];
    newFr[key] = frList[key];
  });

  await fs.writeFile(
    path.join(__dirname, "en_CA.json"),
    JSON.stringify(newEn, null, 2),
    "utf8"
  );
  await fs.writeFile(
    path.join(__dirname, "fr_CA.json"),
    JSON.stringify(newFr, null, 2),
    "utf8"
  );
};

/**
 * Main Code
 *
 * Rewrite the i18n files with the translation keys in alphabetical order
 */
(async () => {
  console.log(
    "\n************ Starting i18n Alphabetization ****************\n"
  );

  const enKeys = Object.keys(enTranslations);
  const frKeys = Object.keys(frTranslations);
  const allKeys = _([...enKeys, ...frKeys])
    .uniq()
    .sort()
    .value();

  await writeNewFiles(enTranslations, frTranslations, allKeys);

  console.log("************ Done i18n Alphabetization ****************\n");
})();
