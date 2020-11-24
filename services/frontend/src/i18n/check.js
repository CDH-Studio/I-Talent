/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const { sortBy, difference, isEqual } = require("lodash");

const en = require("./en_CA.json");
const fr = require("./fr_CA.json");

/**
 * Check for duplicated values in en_CA.json and fr_CA.json
 */
let findDuplicates = arr => arr.filter((s => v => s.has(v) || !s.add(v))(new Set))

const enValues = sortBy(Object.values(en));
const frValues = sortBy(Object.values(fr));


enDuplicateValues = findDuplicates(enValues);
frDuplicateValues = findDuplicates(frValues);

if (enDuplicateValues.length == 0 && frDuplicateValues.length == 0) {
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


/**
 * Check for missing keys in en_CA.json and fr_CA.json
 */
const enKeys = sortBy(Object.keys(en));
const frKeys = sortBy(Object.keys(fr));

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
