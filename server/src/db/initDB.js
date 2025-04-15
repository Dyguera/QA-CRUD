async function createTableIfNotExists(pool) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS todos (
          id SERIAL PRIMARY KEY,
          task TEXT NOT NULL,
          completed BOOLEAN DEFAULT false
        )
      `);
      console.log('Tabela "todos" verificada/criada com sucesso');
    } catch (error) {
      console.error('Erro ao criar tabela:', error);
      throw error;
    }
  }
  
  module.exports = { createTableIfNotExists };