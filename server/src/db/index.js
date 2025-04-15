const { Pool } = require('pg');
const { createTableIfNotExists } = require('./initDb');

// Configuração do pool
// Faz a conexão com o banco de dados usando essas credenciais abaixo
const pool = new Pool({
  user: 'qatest',
  host: 'localhost',
  database: 'todo_db',
  password: 'meu_banco_todo',
  port: 5432,
});

// Testa a conexão e cria a tabela ao iniciar
pool.on('connect', async () => {
  console.log('Conectado ao PostgreSQL');
  await createTableIfNotExists(pool);
});

module.exports = pool;