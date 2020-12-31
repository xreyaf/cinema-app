const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

// Получение идентификатора пользователя
router.get("/", authorization, async (req, res) => {
	try {
		const user = await pool.query(
			"SELECT user_id, user_email FROM users WHERE user_id = $1",
			[req.user.id]
		);
		res.json(user.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
