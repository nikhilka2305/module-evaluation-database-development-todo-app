const todoValidator = (req, res, next) => {
	const { name, status, type } = req.body;

	if (!name || !status) {
		return res
			.status(400)
			.send("You need to include atleast name and status to add a ToDo");
	}

	next();
};

module.exports = todoValidator;
