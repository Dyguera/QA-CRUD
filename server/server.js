const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./src/db/index'); // Importa para garantir a inicialização do DB
const { createTableIfNotExists } = require('./src/db/initDB');
const todosRouter = require('./src/routes/routes');

const app = express();

// Middlewares
app.use(cors()); // Permite conexão com o front-end
app.use(bodyParser.json()); // ou app.use(express.json());

// Rotas
app.use('/', todosRouter);

// Rota de saúde (opcional)
app.get('/health', (req, res) => {
  res.json({ status: 'API rodando!' });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

const PORT = 5000;
createTableIfNotExists(pool).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
})

module.exports = app; // Para testes