const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//Routes//
app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.use("/movies", require("./routes/movies"));

app.use("/booking", require("./routes/booking"));

app.use("/reservations", require("./routes/reservations"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server has started on port ${port}`);
});
