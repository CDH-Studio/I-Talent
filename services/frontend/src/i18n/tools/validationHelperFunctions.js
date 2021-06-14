/**
 * A series of helper functions to check the validity of the i18n translation files
 *
 * This series of function will validate the i18n keys and their values by doing the following:
 * 1) check if the same word has been translated twice (findDuplicateTranslations)
 * 2) check if the english and french files have mismatching keys (findMismatchedTranslations)
 * 3) check if all i18n keys are used the project (findUnusedTranslations)
 *
 */

/* eslint-disable no-console */
const _ = require("lodash");
const path = require("path");
const fs = require("fs").promises;

/**
 * A test to search for duplicate translations values
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

  const enDuplicateValues = findDuplicates(enTranslations);
  const frDuplicateValues = findDuplicates(frTranslations);

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

  return {
    en: enDuplicateValues,
    fr: frDuplicateValues,
  };
};

/**
 * A test to check for mismatched keys between en_CA.json and fr_CA.json
 *
 * @param {object} enTranslations List of english translations
 * @param {object} frTranslations List of english translations
 * @returns {object}  Returns mismatched translation keys
 */
const findMismatchedTranslations = (enKeys, frKeys) => {
  const mismatchedKeys = { extraKeysInEn: [], extraKeysInFr: [] };

  if (!_.isEqual(enKeys, frKeys)) {
    mismatchedKeys.extraKeysInEn = _.difference(enKeys, frKeys);
    mismatchedKeys.extraKeysInFr = _.difference(frKeys, enKeys);

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
 * Gets all files in directory based on file extensions
 *
 * @param {string} dir Directory to search files
 * @param {string} ext Extension of the files to be searched
 * @returns {string[]} Array of file paths relative to this file
 */
const getFilesInDirectory = async (dir, ext) => {
  let files = [];

  try {
    const filesFromDirectory = await fs.readdir(dir);
    await Promise.all(
      filesFromDirectory.map(async (file) => {
        const filePath = path.join(dir, file);
        const stat = await fs.lstat(filePath);
        if (stat.isDirectory()) {
          const nestedFiles = await getFilesInDirectory(filePath, ext);
          files = files.concat(nestedFiles);
        } else if (path.extname(file) === ext) {
          files.push(filePath);
        }
      })
    );
  } catch (e) {
    throw new Error(e.message);
  }

  return files;
};

/**
 *
 * @param {string} dir
 * @param {string[]} ext
 * @returns
 */
const getFileContent = async (dir, ext) => {
  // get all files in directory and flatten into one variable
  const files = await Promise.all(
    ext.map((extension) => getFilesInDirectory(dir, extension))
  );

  return Promise.all(
    _.flatten(files).map(async (i) =>
      fs.readFile(i).then((buffer) => buffer.toString())
    )
  );
};

/**
 * Search given directory files to find unused i18n keys
 *
 * @param {string} dir Directory to search files
 * @param {string[]} ext Extensions of the files to be searched
 * @param {string[]} searchableKeys  Keys to search for in the directory
 * @param {string[]} ignoreKeys  Keys that should not be returned even
 *                               if they were not found in directory
 * @returns {string[]}  Returns keys that were not used in the project
 */
const findUnusedTranslations = async (
  filesContent,
  searchableKeys,
  ignoredKeys
) => {
  const unusedKeys = [];
  searchableKeys.map(async (key) => {
    const result = filesContent.some(
      (content) =>
        _.includes(content, `"${key}"`) ||
        _.includes(content, `'${key}'`) ||
        _.includes(content, `\`${key}\``) ||
        _.includes(ignoredKeys, key)
    );
    if (!result) unusedKeys.push(key);
  });

  if (unusedKeys.length) {
    console.error(
      `${unusedKeys.length} keys that are unused in the project found`,
      unusedKeys
    );
    console.error("findUnusedTranslations check: FAIL\n");
  } else {
    console.error("All keys in en_CA and fr_CA files are used in the project!");
    console.error("findUnusedTranslations check: SUCCESS\n");
  }

  return unusedKeys;
};

const getMissingValuesInI18File = (data) => {};

/**
 *
 * @param {*} filesContent
 * @param {*} searchableKeys
 * @param {*} ignoredKeys
 * @returns
 */
const findMissingTranslations = async (
  filesContent,
  searchableKeys,
  ignoredKeys
) => {
  const valuesMissing = [];
  const patternIntl =
    /intl\.formatMessage(?:.|\n)*?\((?:.|\n)*?({.*?id.*?})(?:.|\n)*?\)/gs;
  const patternDiv = /<FormattedMessage id=['|"|`](?:.|\n)*?['|"|`]/gs;

  const getValue = (data) =>
    _.compact(
      data.map((i) => {
        const value = i.replace(/,|\s/g, "");
        if (value.match(/["|`|'].*['|"|`]/)) {
          const cleanedValue = value
            .match(/["|`|'].*['|"|`]/)[0]
            .replace(/['|"|`]+/g, "");

          if (
            !_.includes(searchableKeys, cleanedValue) &&
            !_.includes(ignoredKeys, cleanedValue) &&
            !_.includes(valuesMissing, cleanedValue) &&
            !_.includes(cleanedValue, "${")
          ) {
            return cleanedValue;
          }
        }
        return null;
      })
    );
  await Promise.all(
    filesContent.map(async (content) => {
      // The following is used for this format
      // intl.formatMessage({ id: "visibility.selector" })
      if (_.includes(content, "intl.formatMessage({")) {
        const data = content.match(patternIntl);
        if (data) valuesMissing.push(...getValue(data));
      }
      // The following is used for this format
      // <FormattedMessage id="" />
      if (_.includes(content, "<FormattedMessage id=")) {
        const data = content.match(patternDiv);
        if (data) valuesMissing.push(...getValue(data));
      }
    })
  );

  if (valuesMissing.length) {
    console.error(
      `${valuesMissing.length} keys that are in the project but missing from the i18 file`,
      valuesMissing
    );
    console.error("missingTranslations check: FAIL\n");
  } else {
    console.error("All the keys in the project are in the i18 files!");
    console.error("missingTranslations check: SUCCESS\n");
  }

  return valuesMissing;
};

/**
 * A test to see if translation keys are alphabetized
 *
 * @param {object} enTranslations List of english translations
 * @param {object} frTranslations List of english translations
 */
const checkTransKeysOrder = async (sortedKeys, allKeys) => {
  const isCorrectlySorted = _.isEqual(allKeys, sortedKeys);
  if (isCorrectlySorted) {
    console.error("Translation keys are in alphabetical order!");
    console.error("checkTransOrder check: SUCCESS\n");
  } else {
    console.error(`Translation keys are not in alphabetical order`);
    console.error(`Please fix i18n files with 'yarn i18n:alphabetize'`);
    console.error("checkTransOrder check: FAIL\n");
  }

  return isCorrectlySorted;
};

module.exports = {
  findDuplicateTranslations,
  findUnusedTranslations,
  findMismatchedTranslations,
  checkTransKeysOrder,
  findMissingTranslations,
  getFileContent,
};
