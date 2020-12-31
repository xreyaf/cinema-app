const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

// middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
}

// Routes
app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.use("/movies", require("./routes/movies"));

app.use("/booking", require("./routes/booking"));

app.use("/reservations", require("./routes/reservations"));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}`);
});
