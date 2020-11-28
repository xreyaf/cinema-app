const Pool = require("pg").Pool;
const pool = new Pool({
	user: "postgres",
	password: "2001",
	host: "localhost",
	port: 5432,
	database: "cinemaapp",
});

module.exports = pool;
