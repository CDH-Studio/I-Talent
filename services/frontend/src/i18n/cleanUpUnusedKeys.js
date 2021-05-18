/**
 * Clean up unused i18n Translations
 *
 * This script parses all react files to find translation keys in the i18n files that are unused.
 * Keys can be added to a blacklist (blacklistKeys.json) to avoid false positives
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

// extract translations from file
const enTranslations = require("./en_CA.json");
const frTranslations = require("./fr_CA.json");

// get all blacklisted keys (keys to be ignored)
const blacklistedKeys = require("./blacklistKeys");

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
 * Overwrites the i18n files without the unused keys and saves them
 *
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
    path.join(__dirname, "en_CA.json"),
    JSON.stringify(newEn, null, 2),
    "utf8"
  );
  await fs.writeFile(
    path.join(__dirname, "fr_CA.json"),
    JSON.stringify(newFr, null, 2),
    "utf8"
  );

  return badKeys;
};

/**
 * Search files to find unused i18n keys
 *
 * @param {string} dir Directory to search files
 * @param {string[]} ext Extensions of the files to be searched
 * @param {string[]} searchableKeys  Keys to search for in the directory
 * @param {string[]} ignoreKeys  Keys that should not be returned even
 *                               if they were not found in directory
 * @returns {string[]}  Returns keys that were not used in the project

 */
const searchForUnusedKeysInFiles = async (
  dir,
  ext,
  searchableKeys,
  ignoreKeys
) => {
  let unusedKeys = [];

  // get all files in directory and flatten into one variable
  let files = await Promise.all(
    ext.map((extension) => getFilesInDirectory(dir, extension))
  );
  files = _.flatten(files);
  const filesContent = await Promise.all(
    files.map(async (i) => fs.readFile(i).then((buffer) => buffer.toString()))
  );

  // function to search for key in file content
  const searchContentForKey = async (key, contentToSearch) =>
    contentToSearch.some(
      (content) =>
        _.includes(content, `"${key}"`) ||
        _.includes(content, `'${key}'`) ||
        _.includes(content, `\`${key}\``) ||
        _.includes(ignoreKeys, key)
    );

  await Promise.all(
    searchableKeys.map(async (key) => {
      const found = await searchContentForKey(key, filesContent);
      if (!found) {
        unusedKeys.push(key);
      }
    })
  );

  console.log(
    `${unusedKeys.length} keys are not being used in the app (they will be removed):`,
    unusedKeys
  );

  return unusedKeys;
};

/**
 * Main Code
 *
 * Find unused i18n keys in the project and clean up the translation list
 */

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

  const unusedKeys = await searchForUnusedKeysInFiles(
    path.join(__dirname, ".."),
    [".jsx"],
    allKeys,
    blacklistedKeys
  );

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

  console.log("************ Done i18n Clean Up ****************\n");
})();
