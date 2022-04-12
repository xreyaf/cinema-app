const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

// Присваивание билетов пользователю
router.post("/:id", authorization, async (req, res) => {
	try {
		const user_id = req.params.id;
		const showtime_id = req.body.shId;
		const booked_seats = req.body.bookedSeats;
		const start_date = req.body.selectedDate;
		const total = req.body.total;

		const newReservation = await pool.query(
			"INSERT INTO reservations (user_id, showtime_id, booked_seats, start_date, total) VALUES ($1, $2,$3,$4,$5) RETURNING *",
			[user_id, showtime_id, booked_seats, start_date, total]
		);

		res.json(newReservation.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Получение всех билетов по идентификатору пользователя
router.get("/user/:id", authorization, async (req, res) => {
	const { id } = req.params;
	try {
		const response = await pool.query(
			"SELECT *, reservations.start_date AS RSD FROM reservations JOIN showtimes  ON reservations.showtime_id=showtimes.showtime_id JOIN movies ON movies.movie_id=showtimes.movie_id WHERE user_id=$1",
			[id]
		);
		res.json(response.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
