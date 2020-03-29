const crypto = require('crypto');

module.exports =  function generateUniqueId() {
  return crypto.randomBytes(4).toString('HEX'); //para gerar 4bytes de caracteres aleatorios para o id da ong e convertendo eles em uma string hexadecimal
}