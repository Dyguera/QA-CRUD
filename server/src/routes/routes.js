const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo
} = require('../db/queries');

// GET /todos - Lista todas as tarefas
router.get('/', async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /todos - Adiciona nova tarefa
router.post('/', async (req, res) => {
  try {
    const newTodo = await addTodo(req.body.task);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /todos/:id - Atualiza tarefa
router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await updateTodo(
      req.params.id,
      req.body.task,
      req.body.completed
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /todos/:id - Remove tarefa
router.delete('/:id', async (req, res) => {
  try {
    await deleteTodo(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;