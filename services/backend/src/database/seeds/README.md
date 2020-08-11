# I-Talent Seeds

Seed management is done manually (with the `dbSeeds` table in the databse), please follow the following instructions.

## Create a seed

If you want to create a new seed:

1.  Create a folder here with the current date/time alongside with a brief explanation of the purspose of the seed

- (ex: if the date is June 10th 2020, the time is 3:03:05 PM (include seconds also), and the message is "Added more fake users", the folder name would be `20200610150305-added-more-fake-users`)

2. Create a `data` folder inside of it where you data would be
3. Create a `index.js` where you would make the prisma calls to add data to the database

- example `index.js` file

```js
const path = require("path");
const prisma = require("../../");
const data = require("./data");

async function seedData() {
  const setupData = []; // Add prisma api calls to this array
  return Promise.all(setupData);
}

async function seed() {
  const folderName = path.dirname(__filename).split(path.sep).pop();

  const dbSeed = await prisma.dbSeeds.findOne({
    where: { id: folderName },
  });

  if (dbSeed) {
    console.log(`---- Starting seeding: ${folderName} ----`);
    await seedData();
    await prisma.dbSeeds.create({
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
