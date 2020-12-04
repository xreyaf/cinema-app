const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//Routes//
app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.get("/movies", async (req, res) => {
	try {
		const movies = await pool.query("SELECT * FROM movies");
		res.json(movies.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server has started on port ${port}`);
});
