const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/todos', todoController.listTodos);
router.post('/todos', todoController.createTodo);
router.put('/todos/:id', todoController.editTodo);
router.delete('/todos/:id', todoController.removeTodo);

module.exports = router;