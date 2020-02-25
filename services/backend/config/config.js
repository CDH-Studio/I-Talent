require("dotenv").config();

const str = process.env.DATABASE_URL;

let [dialect, host, port] = str.split(":");
host = host.replace("//", "");

module.exports = {
  development: {
    username: process.env.PGUSERNAME,
    password: process.env.PGPASS,
    database: process.env.PGDATABASE,
    host: host,
    port: port,
    dialect: dialect
  },
  production: {
    username: process.env.PGUSERNAME,
    password: process.env.PGPASS,
    database: process.env.PGDATABASE,
    host: host,
    port: port,
    dialect: dialect
  },
  staging: {
    uri: process.env.DATABASE_URL,
    dialect: "postgres"
  }
};
