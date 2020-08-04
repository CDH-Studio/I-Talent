/* eslint-disable no-console */
const _ = require("lodash");
const fs = require("fs").promises;
const path = require("path");

const en = require("./en_CA.json");
const fr = require("./fr_CA.json");

const enKeys = Object.keys(en);
const frKeys = Object.keys(fr);

const keys = _([...enKeys, ...frKeys])
  .uniq()
  .sort()
  .value();

// Logic for the next following functions comes from the answer of
// https://stackoverflow.com/questions/48662924/javascript-nodejs-search-for-a-specific-word-string-in-files

/**
 * Gets all the React file names
 *
 * @param {string} dir Directory to search files
 * @param {string} ext Extension of the files to be searched
 * @returns {string[]} Array of file paths relative to this file
 */
async function getFilesInDirectory(dir, ext) {
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
}

/**
 * Overwrites the i18n files without the unused keys and saves them sorted
 *
 * @param {string[]} unusedKeys  Keys in the i18n files that are not being
 *                               used inside the application
 */
async function writeNewFiles(unusedKeys) {
  const newEn = {};
  const newFr = {};

  keys.forEach((key) => {
    if (!unusedKeys.includes(key)) {
      if (enKeys.includes(key)) {
        newEn[key] = en[key];
      }

      if (frKeys.includes(key)) {
        newFr[key] = fr[key];
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
}

/**
 * Search React files to know which i18n keys are not being used
 *
 * @param {string} dir Directory to search files
 * @param {string[]} ext Extensions of the files to be searched
 */
async function searchFilesInDirectory(dir, ext) {
  let files = await Promise.all(
    ext.map((extension) => getFilesInDirectory(dir, extension))
  );
  files = _.flatten(files);
  const filesContent = await Promise.all(
    files.map(async (i) => fs.readFile(i).then((buffer) => buffer.toString()))
  );

  const unusedKeys = [];

  const searchFiles = async (key) =>
    filesContent.some(
      (content) =>
        content.includes(`"${key}"`) ||
        content.includes(`'${key}'`) ||
        content.includes(`\`${key}\``)
    );

  await Promise.all(
    keys.map(async (key) => {
      const found = await searchFiles(key);

      if (!found) {
        unusedKeys.push(key);
      }
    })
  );

  console.log(
    `${unusedKeys.length} keys are not being used (they will be removed):`,
    unusedKeys
  );

  writeNewFiles(unusedKeys);
}

searchFilesInDirectory(path.join(__dirname, ".."), [".js", ".jsx"]);
