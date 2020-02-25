require("dotenv").config();

host = process.env.PGHOST;

module.exports = {
  development: {
    username: process.env.PGUSERNAME,
    password: process.env.PGPASS,
    database: process.env.PGDATABASE,
    host: host,
    port: 5432,
    dialect: "postgres"
  },
  production: {
    username: process.env.PGUSERNAME,
    password: process.env.PGPASS,
    database: process.env.PGDATABASE,
    host: host,
    port: 5432,
    dialect: "postgres"
  },
  staging: {
    uri: process.env.DATABASE_URL,
    dialect: "postgres"
  }
};
