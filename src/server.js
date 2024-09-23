const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../dbConnect.js");
const toDoRoutes = require("./routes/toDoRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
connectDB();
app.get("/", (req, res) => {
	res
		.status(200)
		.send(
			"<h1>Welcome to To Do App built with NodeJS, ExpressJS & MongoDB</h1>"
		);
});

app.use("/todos", toDoRoutes);

app.listen(port, () => {
	console.log(`Listening at ${port}`);
});
