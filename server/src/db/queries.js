const pool = require('./index');

const getAllTodos = async () => {
  const res = await pool.query('SELECT * FROM todos ORDER BY id');
  return res.rows;
};

const addTodo = async (task) => {
  const res = await pool.query(
    'INSERT INTO todos (task) VALUES ($1) RETURNING *',
    [task]
  );
  return res.rows[0];
};

const updateTodo = async (id, task, completed) => {
  const currentTodo = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
  const newTask = task !== undefined ? task : currentTodo.rows[0].task;
  const newCompleted = completed !== undefined ? completed : currentTodo.rows[0].completed;

  const res = await pool.query(
    'UPDATE todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *',
    [newTask, newCompleted, id]
  );
  return res.rows[0];
};

const deleteTodo = async (id) => {
  await pool.query('DELETE FROM todos WHERE id = $1', [id]);
};

module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo
};