
exports.up = function(knex) { //método up sempre é responsável pela criação da tabela
  return knex.schema.createTable('ongs', function (table) { //criando uma tabela no banco
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  })
};

exports.down = function(knex) { //método down é caso precise voltar atrás da crianção da tabela
  return knex.schema.dropTable('ongs'); //excluindo a tabela ongs
};
