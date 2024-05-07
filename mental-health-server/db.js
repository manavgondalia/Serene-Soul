const mysql = require("mysql");
const dotenv = require("dotenv");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "1234",
	database: "mental_health",
});

// export the db object

module.exports = db;
