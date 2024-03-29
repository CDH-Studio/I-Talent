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
const { validate } = require("./validationHelperFunctions");
const en = require("../en_CA.json");
const fr = require("../fr_CA.json");

/**
 * Format translations in JSON format for export
 *
 * @param {Object} enTranslations List of english translations
 * @param {Object} frTranslations List of english translations
 * @returns {Object}  Returns formatted translations for export
 */
const formatTransForExport = (enTranslations, frTranslations) => {
  const formattedTranslations = [];
  const allKeys = Object.keys(enTranslations);

  allKeys.forEach((key) => {
    formattedTranslations.push({
      English: enTranslations[key],
      French: frTranslations[key],
      Key: key,
    });
  });

  return formattedTranslations;
};

/**
 * Convert formatted JSON as CSV and save as file
 *
 * @param {string} fileName Name of file for CSV
 * @param {Object} TranslationJSON Translations in both languages formatted for export
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
  const value = await validate();
  if (!value) process.exit(1);
  // export to CSV upon successful validation
  const FormattedTranslationJSON = formatTransForExport(en, fr);
  try {
    saveAsCSV("../ExportedTranslations.csv", FormattedTranslationJSON);
    console.log("SUCCESS: Translations exported to ExportedTranslations.csv");
  } catch (e) {
    console.error("ERROR: The following error occurred when exporting:");
    console.error("---------------------------------------------------");
    console.error(e);
    console.error("---------------------------------------------------");
  }
  process.exit(0);
})();
