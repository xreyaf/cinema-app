const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

// Получение схем и сенасов для фильма
router.get("/:id", authorization, async (req, res) => {
	const { id } = req.params;
	try {
		const response = await pool.query(
			"SELECT * FROM hallschemes AS h JOIN showtimes AS s ON s.hallscheme_id=h.hallscheme_id JOIN movies AS m ON s.movie_id=m.movie_id WHERE m.movie_id=$1",
			[id]
		);
		if (response.rowCount == 0) {
			return res.status(404).json({ msg: "Not found" });
		}
		res.json(response.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Получение сенасов для фильма
router.get("/showtimes/:id", authorization, async (req, res) => {
	const { id } = req.params;
	try {
		const response = await pool.query(
			"SELECT * FROM showtimes WHERE movie_id=$1 ",
			[id]
		);
		if (response.rowCount == 0) {
			return res.status(404).json({ msg: "Not found" });
		}
		res.json(response.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Обнволение схемы зала
router.put("/hallschemes/:id", authorization, async (req, res) => {
	try {
		const hallscheme_id = req.params.id;
		const seats = req.body.newSeats;
		const updateHallscheme = await pool.query(
			"UPDATE hallschemes SET seats = $1 WHERE hallscheme_id = $2 ",
			[seats, hallscheme_id]
		);

		res.json(updateHallscheme.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});
module.exports = router;
