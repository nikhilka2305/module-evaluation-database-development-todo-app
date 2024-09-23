const ToDo = require("../models/ToDoModel");

exports.getAllTodo = async (req, res) => {
	try {
		const todos = await ToDo.find();
		res.status(200).send(todos);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

exports.addTodo = async (req, res) => {
	try {
		const { name, status, type } = req.body;
		const todo = new ToDo({ name, status, type });
		await todo.save();
		res.status(201).json(todo);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.getOneTodo = async (req, res) => {
	try {
		const { toDoId } = req.params;
		const todo = await ToDo.findById(toDoId);
		if (!todo) {
			return res.status(404).send("No such item in To Do List");
		}
		res.status(200).json(todo);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

exports.updateOneTodo = async (req, res) => {
	try {
		const { toDoId } = req.params;
		const { name, status, type } = req.body;
		const todo = await ToDo.findByIdAndUpdate(
			toDoId,
			{ name, status, type },
			{ new: true }
		);
		if (!todo) {
			return res.status(404).send("No such item in To Do List");
		}
		res.status(201).json(todo);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.deleteOneTodo = async (req, res) => {
	try {
		const { toDoId } = req.params;
		const todo = await ToDo.findByIdAndDelete(toDoId);
		if (!todo) {
			return res.status(404).send("No such item in To Do List");
		}

		res.status(204).json({ message: `Todo with Id: ${toDoId} is deleted` });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
