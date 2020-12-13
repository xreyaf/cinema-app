const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

// Присваивание билетов пользователю
router.post("/:id", authorization, async (req, res) => {
	try {
		const { user_id } = req.params;
		const { showtime_id, booked_seats, start_date, total } = req.body;

		const newReservation = await pool.query(
			"INSERT INTO reservations (user_id, showtime_id, booked_seats, start_date, total) VALUES ($1, $2) RETURNING *",
			[user_id, showtime_id, booked_seats, start_date, total]
		);

		res.json(newReservation.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.starus(500).send("Server Error");
	}
});

module.exports = router;
