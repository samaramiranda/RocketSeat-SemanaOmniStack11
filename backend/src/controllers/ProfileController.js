const connection = require('../database/connection');

module.exports = {
  async index(request, response) { //método para listar os casos especificos de uma unica ong
    const ong_id = request.headers.authorization;//pegando o id da ong logada

    const incidents = await connection('incidents')
      .where('ong_id', ong_id)//buscando os incidentes que a ong_id logada que criou
      .select('*');//selecionando todos os incidentes dessa ong
  
    return response.json(incidents);
  }
}