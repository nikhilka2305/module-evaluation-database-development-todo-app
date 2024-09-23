const express = require("express");
const router = express.Router();
const toDoControllers = require("../controllers/toDoControllers");
const todoValidator = require("../middleware/todoValidator");

router.get("/", toDoControllers.getAllTodo);
router.post("/", todoValidator, toDoControllers.addTodo);
router.get("/:toDoId", toDoControllers.getOneTodo);
router.put("/:toDoId", todoValidator, toDoControllers.updateOneTodo);
router.delete("/:toDoId", toDoControllers.deleteOneTodo);

module.exports = router;
