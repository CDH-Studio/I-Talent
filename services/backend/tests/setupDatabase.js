const { PrismaClient } = require("../src/database/client");
const { execSync } = require("child_process");

async function setupTestDB() {
  const prisma = new PrismaClient({
    datasources: process.env.DATABASE_URL,
  });

  try {
    await prisma.executeRaw(`DROP DATABASE ${process.env.TEST_DATABASE};`);
    console.log("Dropped testing database");
  } catch (e) {}

  await prisma.executeRaw(`CREATE DATABASE ${process.env.TEST_DATABASE};`);
  console.log("Created testing database");

  execSync(`DATABASE_URL=${process.env.TEST_DATABASE_URL} yarn migrate`);
  console.log("Migrated testing database");

  execSync(`DATABASE_URL=${process.env.TEST_DATABASE_URL} yarn generate`);
  console.log("Genereated testing database client");

  execSync(`DATABASE_URL=${process.env.TEST_DATABASE_URL} yarn seed`);
  console.log("Seeded testing database");

  await prisma.disconnect();

  process.exit(0);
}

setupTestDB();
