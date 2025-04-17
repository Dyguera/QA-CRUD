const {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo
} = require('../db/queries');

exports.listTodos = async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = await addTodo(task);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, completed } = req.body;
    const updatedTodo = await updateTodo(id, task, completed);
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTodo(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};