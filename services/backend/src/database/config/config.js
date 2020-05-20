require("dotenv").config();

let dialect;
let host;
let port;
if (process.env.PLATFORM === "OPENSHIFT") {
	[dialect, host, port] = process.env.DATABASE_URL.split(":");
	host = host.replace("//", "");
} else {
	host = process.env.PGHOST;
	port = 5432;
	dialect = "postgres";
}

module.exports = {
	development: {
		username: process.env.PGUSERNAME,
		password: process.env.PGPASS,
		database: process.env.PGDATABASE,
		host: host,
		port: port,
		dialect: dialect,
		seederStorage: "sequelize",
		seederStorageTableName: "SequlizeSeeder",
	},
};
