const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "ToDo name is required"],
		trim: true,
		index: true,
	},
	status: {
		type: String,
		required: [true, "ToDo status is required"],
	},
	type: {
		type: String,
		default: "Uncategorized",
	},
});

const ToDo = mongoose.model("ToDo", todoSchema);
module.exports = ToDo;
