const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development; //configurando variável ambiente de teste

const connection = knex(config); //criando a conexão com o banco

module.exports = connection;
