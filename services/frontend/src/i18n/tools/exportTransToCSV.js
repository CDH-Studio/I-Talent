/**
 * i18n Translations to CSV
 *
 * This script exports the translations into a CSV in the following format:
 * +--------------+----------------+---------------+
 * |    Key       |    English     |    French     |
 * +--------------+----------------+---------------+
 * | sample.key.1 | English Term 1 | French Term 1 |
 * | sample.key.2 | English Term 2 | French Term 1 |
 * | sample.key.3 | English Term 3 | French Term 1 |
 * +--------------+----------------+---------------+
 *
 * To Run:
 * 'yarn i18n:export'
 */

/* eslint-disable no-console */
const { Parser } = require("json2csv");
const fs = require("fs");
const path = require("path");
const testHelpers = require("./validationHelperFunctions");

const en = require("../en_CA.json");
const fr = require("../fr_CA.json");

const blacklistedKeys = require("../blacklistKeys.json");

/**
 * Format translations in JSON format for export
 *
 * @param {object} enTranslations List of english translations
 * @param {object} frTranslations List of english translations
 * @returns {object}  Returns formatted translations for export
 */
const formatTransForExport = (enTranslations, frTranslations) => {
  const formattedTranslations = [];
  const allKeys = Object.keys(enTranslations);

  allKeys.forEach((key) => {
    formattedTranslations.push({
      Key: key,
      English: enTranslations[key],
      French: frTranslations[key],
    });
  });

  return formattedTranslations;
};

/**
 * Convert formatted JSON as CSV and save as file
 *
 * @param {string} fileName Name of file for CSV
 * @param {object} TranslationJSON Translations in both languages formatted for export
 */
const saveAsCSV = (fileName, TranslationJSON) => {
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(TranslationJSON);

  // write csv file in binary format so excel sees accents in french
  fs.writeFileSync(path.join(__dirname, fileName), csv, "binary");
};

/**
 * Main Code
 *
 * Run checks to validate i18n files
 */
(async () => {
  console.log("\n************ Starting i18n Export ****************\n");

  // Remove all blacklisted key from the check
  const cleanedEn = en;
  const cleanedFr = fr;
  blacklistedKeys.forEach((key) => delete cleanedEn[key]);
  blacklistedKeys.forEach((key) => delete cleanedFr[key]);

  // Validate i18n files before export
  console.log("Running validation tests on i18n files before export...\n");
  const duplicatedTranslations = testHelpers.findDuplicateTranslations(
    cleanedEn,
    cleanedFr
  );
  const mismatchedTransKeys = testHelpers.findMismatchedTranslations(
    cleanedEn,
    cleanedFr
  );
  const unusedTranslations = await testHelpers.findUnusedTranslations(
    cleanedEn,
    cleanedFr
  );

  if (
    duplicatedTranslations.length ||
    mismatchedTransKeys.extraKeysInEn.length ||
    mismatchedTransKeys.extraKeysInFr.length ||
    unusedTranslations.length
  ) {
    console.error(
      "Export Canceled: Errors found in the files. Please correct and try again. \n"
    );
    process.exit(1);
  } else {
    console.log("Validation Successful! Beginning Export... \n");

    // export to CSV upon successful validation
    const FormattedTranslationJSON = formatTransForExport(en, fr);

    try {
      saveAsCSV("ExportedTranslations.csv", FormattedTranslationJSON);
      console.log("SUCCESS: Translations exported to ExportedTranslations.csv");
    } catch (e) {
      console.error("ERROR: The following error occurred when exporting:");
      console.error("---------------------------------------------------");
      console.error(e);
      console.error("---------------------------------------------------");
    }

    process.exit(0);
  }
})();
