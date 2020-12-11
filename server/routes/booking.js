const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

router.get("/:id", authorization, async (req, res) => {
	const { id } = req.params;
	try {
		const response = await pool.query(
			"SELECT * FROM halls JOIN showtimes ON showtimes.hall_id=halls.hall_id JOIN movies ON showtimes.movie_id=movies.movie_id WHERE movies.movie_id=$1",
			[id]
		);
		res.json(response.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

router.get("/showtimes/:id", authorization, async (req, res) => {
	const { id } = req.params;
	try {
		const response = await pool.query(
			"select array_to_string(ARRAY(select DISTINCT startat from showtimes WHERE movie_id=$1 ORDER BY startat), ',')",
			[id]
		);
		res.json(response.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
