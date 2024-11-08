//import library
const Sequelize = require("sequelize");
//keys
const conexaoComBanco = new Sequelize("financeiro", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const transacoes = conexaoComBanco.define("transacao", {
  tipo: {
    type: Sequelize.TEXT,//TEXTAREA
  },
  valor: {
    type: Sequelize.STRING,//TEXTAREA
  },
  data: {
    type: Sequelize.DATE,//TEXTAREA
  },
  descricao: {
    type: Sequelize.TEXT,//TEXTAREA
  },

});

async function createDb() {
  // Exemplo simples de criação do banco de dados
  const db = await openDatabase('financeiro', '1.0', 'Banco de Dados de Transações', 2 * 1024 * 1024);
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS transacoes (id INTEGER PRIMARY KEY, tipo TEXT, valor REAL, data TEXT, descricao TEXT)');
  });
}

const transacao = {
  create: function(data) {
    const db = openDatabase('financeiro', '1.0', 'Banco de Dados de Transações', 2 * 1024 * 1024);
    db.transaction(function(tx) {
      tx.executeSql(
        'INSERT INTO transacoes (tipo, valor, data, descricao) VALUES (?, ?, ?, ?)',
        [data.tipo, data.valor, data.data, data.descricao],
        function(tx, result) {
          console.log('Inserido com sucesso:', result);
        },
        function(tx, error) {
          console.error('Erro ao inserir:', error);
        }
      );
    });
  }
};


// Função para inserir os dados com base nas alterações do usuário
async function Insert() {
  // Coletar dados dos campos do formulário
  const tipo = document.getElementById("tipo").value;
  const valor = document.getElementById("valor").value;
  const data = document.getElementById("data").value;
  const descricao = document.getElementById("descricao").value;

  // Verificar se todos os campos estão preenchidos
  if (!tipo || !valor || !data || !descricao) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Realizar o processamento da transação, inserindo no banco de dados
  await createDb();
  await transacao.create({
    tipo: tipo,
    valor: valor,
    data: data,
    descricao: descricao
  });

  // Limpar os campos do formulário após inserção (opcional)
  document.getElementById("form-insert").reset();
}

// Aguardar o evento de envio do formulário para chamar a função Insert
document.getElementById("form-insert").addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o envio do formulário tradicional
  Insert();
});