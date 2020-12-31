const express = require("express");
const app = express();
const cors = require("cors");
<<<<<<< HEAD:app.js
const path = require("path");
=======
>>>>>>> origin/dev:server/app.js

//middleware
app.use(cors());
app.use(express.json()); //req.body

app.use(express.static("client/build"));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);

//Routes
app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.use("/movies", require("./routes/movies"));

app.use("/booking", require("./routes/booking"));

app.use("/reservations", require("./routes/reservations"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}`);
});
