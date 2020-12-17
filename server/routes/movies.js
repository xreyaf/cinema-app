const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

// Получение фильмов
router.get("/", authorization, async (req, res) => {
	try {
		const movies = await pool.query("SELECT * FROM movies");
		res.json(movies.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Получение фильма по идентификатору
router.get("/:id", authorization, async (req, res) => {
	const { id } = req.params;
	try {
		const movie = await pool.query("SELECT * FROM movies WHERE movie_id = $1", [
			id,
		]);
		res.json(movie.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
