// Create a Sequelize instance
const Sequelize = require("sequelize");

require("dotenv").config();

const str = process.env.DATABASE_URL;

let [dialect, host, port] = str.split(":");
// host = host.replace("//", "");

host = process.env.PGHOST;

// Option 1: Passing parameters separately
module.exports = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSERNAME,
  process.env.PGPASS,
  {
    host: host,
    port: 5432,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  }
);
