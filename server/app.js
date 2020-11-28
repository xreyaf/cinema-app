const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//Routes//
app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
	console.log("Server has started on port 5000");
});
