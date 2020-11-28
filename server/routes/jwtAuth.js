const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validinfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

//registering
router.post("/register", validinfo, async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
			email,
		]);

		if (user.rows.length !== 0) {
			return res.status(401).send("User already exist");
		}
		//bcypt пароля
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const bcryptPassword = await bcrypt.hash(password, salt);

		//новый пользователь
		const newUser = await pool.query(
			"INSERT INTO users (user_email, user_password) VALUES ($1, $2) RETURNING *",
			[email, bcryptPassword]
		);
		//генерирование токена
		const token = jwtGenerator(newUser.rows[0].user_id);

		res.json({ token });
	} catch (err) {
		console.error(err.message);
		res.starus(500).send("Server Error");
	}
});

//login route

router.post("/login", validinfo, async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
			email,
		]);
		if (user.rows.length === 0) {
			return res.status(401).json("Passsword or Email is incorrect");
		}

		const validPassword = await bcrypt.compare(
			password,
			user.rows[0].user_password
		);
		if (!validPassword) {
			return res.status(401).json("Passsword or Email is incorrect");
		}
		const token = jwtGenerator(user.rows[0].user_id);

		res.json({ token });
	} catch (err) {
		console.error(err.message);
		res.starus(500).send("Server Error");
	}
});

router.get("/is-verify", authorization, async (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		console.error(err.message);
		res.starus(500).send("Server Error");
	}
});

module.exports = router;
