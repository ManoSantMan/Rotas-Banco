//import librarys
const Sequelize = require("sequelize");//sequelize
const express = require("express");//express
//Clonando a varável com poderes das bibliotecas 
const app = express(); //Express
const { create } = require("express-handlebars");


//###CONEXÃO BANCO DE DADOS###
const conexaoComBanco = new Sequelize("financeiro", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
//### FIM CONEXÃO BANCO DE DADOS###

app.get("/", function (req, res) {
  res.send("VAI CORINTHIANS!!!!!!!!!");
});

app.get("/categoria/:id_categoria/:nome", function (req, res) {
  res.send(req.params);
});

app.get("/conta/:id_conta/:nome/:saldo/:id_usuario", function (req, res) {
    res.send(req.params);
});

app.get("/usuario/:id_usuario/:nome/:email/:senha", function (req, res) {
  res.send(req.params);
});

app.get("/transacao/:id_transacao/:tipo/:valor/:data/:descricao/:id_categoria/:id_conta", function (req, res) {
  res.send(req.params);
  res.render("form"); //renderizando a pagina form.handlebars
});

app.listen(3031, function () {
  console.log("Server is running on port 3031");
});