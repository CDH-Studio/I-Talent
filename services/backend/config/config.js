require("dotenv").config();

// const str = process.env.DATABASE_URL;

// let [dialect, host, port] = str.split(":");
// host = host.replace("//", "");

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
