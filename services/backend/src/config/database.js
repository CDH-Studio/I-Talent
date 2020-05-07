// Create a Sequelize instance
const Sequelize = require("sequelize");

require("dotenv").config();

let dialect;
let host;
let port;
if (process.env.PLATFORM == "OPENSHIFT") {
  [dialect, host, port] = process.env.DATABASE_URL.split(":");
  host = host.replace("//", "");
} else {
  host = process.env.PGHOST;
  port = 5432;
  dialect = "postgres";
}

module.exports = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSERNAME,
  process.env.PGPASS,
  {
    host: host,
    port: port,
    dialect: dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  }
);
