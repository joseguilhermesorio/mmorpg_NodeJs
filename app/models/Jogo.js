var ObjectId = require('mongodb').ObjectId;

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

Jogo.prototype.iniciaJogo = function(usuario,req,res,msg){
  this.connection.open(function(err,mongoclient){
    mongoclient.collection("jogo",function(err,collection){
      collection.find({usuario: usuario}).toArray(function(err,result){

        res.render("jogo",{img_casa: req.session.casa, jogo: result[0], msg: msg})

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

      switch(parseInt(acao.acao)){
        case 1 : tempo = 1 * 60 * 60000;break;
        case 2 : tempo = 2 * 60 * 60000;break;
        case 3 : tempo = 5 * 60 * 60000;break;
        case 4 : tempo = 5 * 60 * 60000;break;
      }

      acao.acao_termina_em = date.getTime() + tempo;

      collection.insert(acao);

    });

    mongoclient.collection("jogo",function(err,collection){

      var moedas = null;

      switch(parseInt(acao.acao)){
        case 1 : moedas = -2 * acao.quantidade;break;
        case 2 : moedas = -3 * acao.quantidade;break;
        case 3 : moedas = -1 * acao.quantidade;break;
        case 4 : moedas = -1 * acao.quantidade;break;
      }

      collection.update(
        {usuario: acao.usuario},
        {$inc: {moedas: moedas}}
      );

      mongoclient.close();
    });
  });
}

Jogo.prototype.recuperaAcoes = function(usuario,res){
  this.connection.open(function(err,mongoclient){
    mongoclient.collection("acao",function(err,collection){
      var data = new Date();
      var momento_atual = data.getTime();
      collection.find({usuario: usuario, acao_termina_em: {$gt: momento_atual}}).toArray(function(err,result){
        res.render("pergaminhos",{acoes: result});

        mongoclient.close();
      });
    });
  });
}

Jogo.prototype.remover_ordem = function(id_acao, res){
  this.connection.open(function(err,mongoclient){
    mongoclient.collection("acao",function(err,collection){
      collection.remove(
        {_id : ObjectId(id_acao)},
        function(err,result){
          res.redirect("jogo?msg=D")
        }
      );
      mongoclient.close();
    });
  });
}

module.exports = function(){
  return Jogo;
}
