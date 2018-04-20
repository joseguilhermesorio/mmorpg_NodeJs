//importacao do MongoDB
const mongoDB = require('mongodb');

const conexao = function(){
  const db = new mongoDB.Db(
    'got',
    new mongoDB.Server(
      'localhost', //Endereco do servidor do Banco de Dados
      27017,//Porta de Conexao
      {}
    ),
    {}
  );

  return db;
}


module.exports = function(){
  return conexao;
}
