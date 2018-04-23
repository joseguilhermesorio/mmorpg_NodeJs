function Jogo(connection){
  this.connection = connection()
}

Jogo.prototype.gerarDados = function(usuario){
  this.connection.open(function(err,mongoclient){
    mongoclient.collection("jogo",function(err,collection){
      collection.insert({
        usuario: usuario,
        moedas: 15,
        suditos: 25,
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio: Math.floor(Math.random() * 1000),
        magia: Math.floor(Math.random() * 1000)
      });


      mongoclient.close();
    });
  });
}

Jogo.prototype.iniciaJogo = function(usuario,req,res,comando_invalido){
  this.connection.open(function(err,mongoclient){
    mongoclient.collection("jogo",function(err,collection){
      collection.find({usuario: usuario}).toArray(function(err,result){

        res.render("jogo",{img_casa: req.session.casa, jogo: result[0], comando_invalido: comando_invalido})

        mongoclient.close();
      });
    });
  });
}

Jogo.prototype.acao = function(acao){
  this.connection.open(function(err,mongoclient){
    mongoclient.collection("acao",function(err,collection){

      var date = new Date();

      var tempo = null;

      switch(acao.acao){
        case 1 : tempo = 1 * 60 * 60000;
        case 2 : tempo = 2 * 60 * 60000;
        case 3 : tempo = 5 * 60 * 60000;
        case 4 : tempo = 5 * 60 * 60000;
      }

      acao.acao_termina_em = date.getTime() + tempo;

      collection.insert(acao);

      mongoclient.close();
    });
  });
}

module.exports = function(){
  return Jogo;
}
