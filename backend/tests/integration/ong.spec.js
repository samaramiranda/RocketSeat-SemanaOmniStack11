const request = require('supertest'); //importando a biblioteca do teste de integração
const app = require('../../src/app');//importando os testes
const connection = require('../../src/database/connection');//importando a conexão com banco e dados

describe('ONG', () => { //testando se é possível criar uma nova ong
  beforeEach(async() => {//antes e cada um dos testes eu faço um migrate com o banco de dados do knex
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async() => {
    await connection.destroy();//desconectar do banco de dados depois que terminar os testes
  })
  
  it('should be able to create a new ONG', async () => {
    const response = await request(app) //enviando uma requisição do tipo post para a rota ongs
      .post('/ongs')
      .send({
        name: "APAD2",
        email: "contato@teste.com",
        whatsapp: "4700000000",
        city: "Rio do Sul",
        uf: "SC"
    });

    expect(response.body).toHaveProperty('id'); //verificando pelo id da ong se ela foi criada
    expect(response.body.id).toHaveLength(8);//verificando se o id da ong tem 8 caracteres
  });
})