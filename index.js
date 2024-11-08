const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Criar instância do servidor Express
const app = express();

// Configurar o servidor para aceitar JSON
app.use(bodyParser.json());
app.use(cors());

// Configurar a conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Usuário do MySQL
  password: '', // Senha do MySQL
  database: 'financeiro' // Nome do banco de dados
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Rota para adicionar transação
app.post('/add-transacao', (req, res) => {
  const { tipo, valor, data, descricao } = req.body;

  const query = 'INSERT INTO transacoes (tipo, valor, data, descricao) VALUES (?, ?, ?, ?)';
  db.query(query, [tipo, valor, data, descricao], (err, result) => {
    if (err) {
      console.error('Erro ao inserir transação:', err);
      res.status(500).send('Erro ao adicionar transação');
    } else {
      res.status(200).send('Transação adicionada com sucesso!');
    }
  });
});

// Rota para listar transações
app.get('/transacoes', (req, res) => {
  const query = 'SELECT * FROM transacoes';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao buscar transações:', err);
      res.status(500).send('Erro ao buscar transações');
    } else {
      res.status(200).json(result);
    }
  });
});

// script.js

// Função para atualizar o círculo com a porcentagem
function updateCircle(percentage) {
  const circle = document.querySelector('.circle-foreground');
  const text = document.querySelector('.percentage-text');
  
  // Calcular o valor do dashoffset com base na porcentagem
  const offset = 100 - percentage; // O valor máximo (100) será 0% de preenchimento, e 0 será 100% de preenchimento

  // Atualiza o preenchimento do círculo
  circle.style.strokeDashoffset = offset;

  // Atualiza o texto
  text.textContent = `${percentage}%`;
}

// Exemplo: Atualizar para 75%
updateCircle(75);

// Função para testar a mudança de porcentagem ao longo do tempo
let currentPercentage = 0;
setInterval(() => {
  if (currentPercentage <= 100) {
      updateCircle(currentPercentage);
      currentPercentage++;
  }
}, 50); // Atualiza a cada 50ms


// Configurar porta do servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});