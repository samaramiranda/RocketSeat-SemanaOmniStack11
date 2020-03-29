const generateUniqueId = require('../../src/utils/generateUniqueId'); //importando a função a ser testada

describe('Generate Unique ID', () => { //1 parametro é a categoria do teste. 2 Parametro é a função de teste
  it('should generate an unique ID', () => {
    const id = generateUniqueId();

    expect(id).toHaveLength(8);//testando se o id tem 8 caracteres
  })
});