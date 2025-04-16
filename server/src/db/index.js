const { Pool } = require('pg');
const { createTableIfNotExists } = require('./initDB');

// Configuração do pool
// Faz a conexão com o banco de dados usando essas credenciais abaixo
const pool = new Pool({
  user: 'qatest',
  host: 'db',
  database: 'todo_db',
  password: 'meu_banco_todo',
  port: 5432,
});

module.exports = pool;