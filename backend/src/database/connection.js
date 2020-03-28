const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); //criando a conexão com o banco

module.exports = connection;
