const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection'); //importando a conexão com o banco de dados

module.exports = {
  async index (request, response) {
    const ongs = await connection('ongs').select('*');//lista todos os campos de todos os registro da tabela ongs
    
    return response.json(ongs);
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body; //desestruturando os campos da ong

    const id = generateUniqueId(); //chama a função ara gerar id
    
    await connection('ongs').insert({//método para conectar a tabela ongs e inserir dados dentro dela
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    return response.json({ id });
  }
};