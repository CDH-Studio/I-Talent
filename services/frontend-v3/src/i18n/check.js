/* eslint-disable no-console */
const { sortBy, difference, isEqual } = require("lodash");

const en = require("./en_CA.json");
const fr = require("./fr_CA.json");

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
