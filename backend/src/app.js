const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express(); 

app.use(cors());//método que define quem pode acessar
app.use(express.json()); //deve vir antes das rotas. Express ir no corpo da requisição e converter o JSON em objeto javascript
app.use(routes); //obrigatório essa linha estar embaixo do express.json
app.use(errors()); //para tratar os erros de validação

module.exports = app;