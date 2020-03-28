const connection = require('../database/connection');

module.exports = {
  async index(request, response) { //método para listar os incidentes
    const { page = 1 } = request.query; //criando paginação
    
    const [count] = await connection('incidents').count()//para contar a quantidade de casos total que tenho cadastrados

    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//parajuntar os dados da tabela de incidentes com a das ongs
    .limit(5)//limitando a busca m 5 incidentes
    .offset((page - 1) * 5)//para pular os 5 incidentes por pagina
    .select(['incidents.*', //lista todos os campos do incidentes e seleciono os campos que quero listar das ongs
    'ongs.name', 
    'ongs.email', 
    'ongs.whatsapp', 
    'ongs.city',
    'ongs.uf'
    ])
  
    response.header('X-Total-Count', count['count(*)']); //retornando a quantidade total de casos pelo header da reposta

    return response.json(incidents);
  },

  async create(request, response) { //método para criar um incidente
    const { title, description, value } = request.body;
    //headers guardam informações do contexto da requisição, como dados da autenticação do usuário, localização;
    const ong_id = request.headers.authorization; //acessando id da ong pelo header
  
    const [id] = await connection('incidents').insert({//método para conectar a tabela incidents e inserir dados dentro dela
      title, 
      description, 
      value,
      ong_id,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params; //pegando o id do incidente
    const ong_id = request.headers.authorization; //pegando o id da ong logada no momento
  
    const incident = await connection('incidents') //busca no banco de dados apenas o incidente que tem id da ong
    .where('id', id)
    .select('ong_id')
    .first(); //para retornar apenas um resultado
  
    if(incident.ong_id != ong_id){//se id da ong que criou o incidente for diferente do id da ong que está logado eu apresento erro
      return response.status(401).json({ error: 'Operation not permited.' });
    }

    await connection('incidents').where('id', id).delete(); //se passou nas verificações acima eu delete o incidente
  
    return response.status(204).send();//resposta de que deu sucesso mas não tem conteúdo para retornar
  }
};