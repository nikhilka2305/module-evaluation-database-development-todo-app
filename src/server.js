const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../dbConnect.js");
const toDoRoutes = require("./routes/toDoRoutes");
const ToDo = require("./models/ToDoModel.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
connectDB();
app.get("/", async (req, res) => {
	const TotalItemsinDB = await ToDo.aggregate([{ $count: "Total Todos" }]);
	const completionStatus = await ToDo.aggregate([
		{
			$group: {
				_id: "$status",
				Total: { $sum: 1 },
			},
		},
	]);

	const typesToDos = await ToDo.aggregate([
		{
			$group: {
				_id: "$type",
				Total: { $sum: 1 },
			},
		},
	]);

	res.status(200).json({
		title: "Welcome to To Do App built with NodeJS, ExpressJS & MongoDB",
		Total_Number_Of_ToDos: TotalItemsinDB,
		Completion_Status: completionStatus,
		ToDo_Types: typesToDos,
	});
});

app.use("/todos", toDoRoutes);

app.listen(port, () => {
	console.log(`Listening at ${port}`);
});
