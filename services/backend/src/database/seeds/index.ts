import { readdirSync } from "fs";
import path from "path";
import prisma from "..";

/**
 * Gets a list of directories in the for the seeds
 *
 * Inspired from https://stackoverflow.com/questions/18112204/get-all-directories-within-directory-nodejs
 */
function getSeedDirectories() {
  return readdirSync(__dirname, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name);
}

async function seed() {
  const seedDirectories = getSeedDirectories();

  const seedFunctions = seedDirectories.map((directory) =>
    // eslint-disable-next-line
    require(path.join(__dirname, directory))
  );

  console.log("---- STARTED SEEDING ----\n");

  await seedFunctions.reduce(
    (prevValue, currentValue) => prevValue.then(() => currentValue()),
    Promise.resolve(null)
  );

  console.log("---- FINISHED SEEDING, all seeds were applied ----");

  await prisma.disconnect();

  process.exit(0);
}

seed();
