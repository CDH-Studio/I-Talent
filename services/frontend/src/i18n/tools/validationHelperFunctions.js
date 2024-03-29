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

const en = require("../en_CA.json");
const fr = require("../fr_CA.json");
const ignoredKeys = require("../ignoredKeys.json");

/**
 * A test to search for duplicate translations values
 *
 * @param {Object} enTranslations List of english translations
 * @param {Object} frTranslations List of english translations
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

  const enDuplicateValues = findDuplicates(
    enTranslations.map((i) => i.toLowerCase())
  );
  const frDuplicateValues = findDuplicates(
    frTranslations.map((i) => i.toLowerCase())
  );

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
 * @param {Object} enKeys List of english translations
 * @param {Object} frKeys List of english translations
 * @returns {Object}  Returns mismatched translation keys
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
 * returns the content of a file in a string format
 * @param {string} dir the directory of the files
 * @param {string[]} ext the extensions of the files
 * @returns {string[]} returns the content of the files in an array of strings
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
 * @param {string[]} filesContent an array of strings containing the content of the files
 * @param {string[]} searchableKeys a list of all the keys in the 18n file
 * @returns
 */
const findUnusedTranslations = async (filesContent, searchableKeys) => {
  const unusedKeys = [];
  // search for key in file content
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

/**
 * This function checks if there is a value in the ignored list but not located in the translation files.
 *
 * @param {string[]} searchableKeys list of all keys sorted
 * @returns the missing keys
 */
const findMissingValuesInIgnoredFile = (searchableKeys) => {
  const missingValues = _.difference(ignoredKeys, searchableKeys);
  if (missingValues.length) {
    console.error(
      `${missingValues.length} keys are in the ignore file but not in the translation file`,
      missingValues
    );
    console.error("findMissingValuesInIgnoredFile check: FAIL\n");
  } else {
    console.error("All keys in ignore file are in translation file!");
    console.error("findMissingValuesInIgnoredFile check: SUCCESS\n");
  }
  return missingValues;
};

/**
 * Cleans up the string value to obtain a key and compares it to
 * value in the provided lists to check if its in the file
 * @param {string} data string all the values that match the pattern
 * @param {string[]} searchableKeys list of searchable keys
 * @param {string[]} valuesMissing list of missing keys
 * @returns
 */
const getMissingValuesInI18File = (data, searchableKeys, valuesMissing) =>
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

/**
 * This function searches through the project jsx files to find all the
 * used translations keys and compares them with the translations in the 18n file.
 *
 * @param {string[]} filesContent an array of strings containing the content of the files
 * @param {string[]} searchableKeys a list of all the keys in the 18n file
 * @returns
 */
const findMissingTranslations = async (filesContent, searchableKeys) => {
  let valuesMissing = [];
  await Promise.all(
    filesContent.map(async (content) => {
      // The following is used for this format
      // intl.formatMessage({ id: "visibility.selector" })
      if (_.includes(content, "intl.formatMessage({")) {
        const data = content.match(
          /intl\.formatMessage(?:.|\n)*?\((?:.|\n)*?({.*?id.*?})(?:.|\n)*?\)/gs
        );
        if (data)
          valuesMissing.push(
            ...getMissingValuesInI18File(
              data,
              searchableKeys,
              ignoredKeys,
              valuesMissing
            )
          );
      }
      // The following is used for this format
      // <FormattedMessage id="" />
      if (_.includes(content, "<FormattedMessage id=")) {
        const data = content.match(
          /<FormattedMessage id=['|"|`](?:.|\n)*?['|"|`]/gs
        );
        if (data)
          valuesMissing.push(
            ...getMissingValuesInI18File(
              data,
              searchableKeys,
              ignoredKeys,
              valuesMissing
            )
          );
      }
    })
  );
  valuesMissing = _.uniq(valuesMissing);
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
 * @param {string[]} enKeys a list of keys in english
 * @param {string[]} frKeys a list of keys in french
 * @returns
 */
const checkTransKeysOrder = async (enKeys, frKeys) => {
  const sortedEnKeys = _(_.cloneDeep(enKeys)).sort();
  const sortedFrKeys = _(_.cloneDeep(frKeys)).sort();

  const isEnCorrectlySorted = _.isEqual(enKeys, sortedEnKeys);
  const isFrCorrectlySorted = _.isEqual(frKeys, sortedFrKeys);

  if (isEnCorrectlySorted && isFrCorrectlySorted) {
    console.error("Translation keys are in alphabetical order!");
    console.error("checkTransOrder check: SUCCESS\n");
  } else {
    console.error(`Translation keys are not in alphabetical order`);
    console.error(`Please fix i18n files with 'yarn i18n:alphabetize'`);
    console.error("checkTransOrder check: FAIL\n");
  }

  return isEnCorrectlySorted && isFrCorrectlySorted;
};

/**
 *
 * Run checks to validate i18n files
 */
async function validate() {
  console.log("\n************ Starting i18n Validator ****************\n");

  const enKeys = Object.keys(en);
  const frKeys = Object.keys(fr);
  const enValues = Object.values(en);
  const frValues = Object.values(fr);

  const sortedKeys = _([...enKeys, ...frKeys])
    .uniq()
    .sort()
    .value();
  const filesContent = await getFileContent(path.join(__dirname, "../.."), [
    ".jsx",
  ]);

  const [unusedTranslations, missingTranslations, areTransKeysAlphabetized] =
    await Promise.all([
      findUnusedTranslations(filesContent, sortedKeys),
      findMissingTranslations(filesContent, sortedKeys),
      checkTransKeysOrder(enKeys, frKeys),
    ]);
  const findMissingValuesInIgnored = findMissingValuesInIgnoredFile(sortedKeys);
  const duplicatedTranslations = findDuplicateTranslations(enValues, frValues);
  const mismatchedTransKeys = findMismatchedTranslations(enKeys, frKeys);
  if (
    duplicatedTranslations.en.length ||
    duplicatedTranslations.fr.length ||
    mismatchedTransKeys.extraKeysInEn.length ||
    mismatchedTransKeys.extraKeysInFr.length ||
    unusedTranslations.length ||
    missingTranslations.length ||
    findMissingValuesInIgnored.length ||
    !areTransKeysAlphabetized
  ) {
    console.error("Summary: I18n Validator FAILED =========\n");
    return false;
  }
  console.error("Summary: I18n Validator PASSED =========\n");
  return true;
}

module.exports = {
  checkTransKeysOrder,
  findDuplicateTranslations,
  findMismatchedTranslations,
  findMissingTranslations,
  findMissingValuesInIgnoredFile,
  findUnusedTranslations,
  getFileContent,
  validate,
};
