//import library
const Sequelize = require("sequelize");
//keys
const conexaoComBanco = new Sequelize("financeiro", "root", "", {
  host: "localhost",
  dialect: "mysql",
});



const conta = conexaoComBanco.define("conta", {
    nome: {
      type: Sequelize.TEXT,//TEXTAREA
    },
    saldo: {
      type: Sequelize.STRING,//TEXTAREA
    },
});

const usuario = conexaoComBanco.define("usuario", {
  nome: {
    type: Sequelize.TEXT,//TEXTAREA
  },
  email: {
    type: Sequelize.TEXT,//TEXTAREA
  },
  senha: {
    type: Sequelize.TEXT,//TEXTAREA
  },
});

const categoria = conexaoComBanco.define("categoria", {
  nome: {
    type: Sequelize.TEXT,//TEXTAREA
  },

});


const transacao = conexaoComBanco.define("transacao", {
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
  await categoria.sync();
  await transacao.sync();
  await usuario.sync();
  await conta.sync()
}

Insert()
// INSERT
async function Insert() {
await createDb()
categoria.create({
 nome: "Um conteudo qualquer",
});

usuario.create({
 nome: "Santiago",
 email: "sant@email.com",
 senha: "senha",
});

conta.create({
nome: "nome da conta",
 saldo: "10",
});

transacao.create({
  tipo: "blablabla",
  valor: "250",
  data: "12-10-24",
  descricao: "muito cash",
});}