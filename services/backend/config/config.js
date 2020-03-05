require("dotenv").config();

host = process.env.PGHOST;

module.exports = {
  development: {
    username: process.env.PGUSERNAME,
    password: process.env.PGPASS,
    database: process.env.PGDATABASE,
    host: host,
    port: 5432,
    dialect: "postgres",
    seederStorage: "sequelize",
    seederStorageTableName: "SequlizeSeeder"
  }
};
