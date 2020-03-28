const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id } = request.body; //verificando se a ong existe através do id
  
    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first(); //para retornar apenas uma ong
  
    if(!ong) {//se a ong não existir
      return response.status(400).json({ error: 'No ONG found with this ID' });//retornar mensagem de erro pro body
    }

    return response.json(ong); //retorna os dados da ong
  }
}