
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table) { //criando uma tabela no banco
    table.increments(); //cria uma chave primaria auto incremento
  
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable(); //relacionando a coluna ong_id com o id da ong (deve ser string igual a coluna id da tabela ongs)
  
    table.foreign('ong_id').references('id').inTable('ongs'); //criando a chave estrangeira que referencia a coluna ong_id com a coluna id dentro da tabela ongs
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
