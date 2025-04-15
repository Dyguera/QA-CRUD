import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Carrega TODOs ao iniciar
  useEffect(() => {
    fetchTodos();
  }, []);

  // Busca TODOs da API
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/');
      setTodos(response.data);
    } catch (error) {
      console.error('Erro ao buscar TODOs:', error);
    }
  };

  // Adiciona novo TODO
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await axios.post('http://localhost:5000/', { task: newTodo });
      setNewTodo('');
      fetchTodos(); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao adicionar TODO:', error);
    }
  };

  // Atualiza status de completed
  const toggleTodo = async (id,completed, currentTask) => {

    try {
      await axios.put(`http://localhost:5000/${id}`, { 
        task: currentTask,
        completed: !completed });
      fetchTodos();
    } catch (error) {
      console.error('Erro ao atualizar TODO:', error);
    }
  };

  // Remove TODO
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Erro ao deletar TODO:', error);
    }
  };

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nova tarefa..."
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id, todo.completed)}
            >
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;