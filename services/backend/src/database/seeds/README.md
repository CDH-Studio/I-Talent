# I-Talent Seeds

Seed management is done manually (with the `dbSeeds` table in the database), please follow the following instructions.

## Create a seed

If you want to create a new seed:

1. Create a folder here with the current date/time alongside with a brief explanation of the purpose of the seed - (ex: if the date is June 10th 2020, the time is 3:03:05 PM (include seconds also), and the message is "Added more fake users", the folder name would be `20200610150305-added-more-fake-users`)

2. Create a `data` folder inside of it where you data would be
3. Create a `index.js` where you would make the prisma calls to add data to the database

- example `index.js` file

```js
const path = require("path");
const prisma = require("../..");
const data = require("./data");

async function seedStaticInfo() {
  const staticInfo = []; // add the prisma function here
  return Promise.all(staticInfo);
}

async function seed() {
  const folderName = path.dirname(__filename).split(path.sep).pop();

  const dbSeed = await prisma.dbSeed.findUnique({
    where: { id: folderName },
  });

  if (!dbSeed) {
    console.log(`---- Starting seeding: ${folderName} ----`);
    await seedStaticInfo();
    await prisma.dbSeed.create({
      data: {
        id: folderName,
      },
    });
    console.log(`---- Finished seeding: ${folderName} ----\n`);
  }

  await prisma.$disconnect();
}

module.exports = seed;
```
