function Usuario(connection){

  this.connection = connection();
}

//Funcao de Cadastrar usuarios no banco
Usuario.prototype.inserir = function(usuario){
  this.connection.open( function(err, mongoclient){
    mongoclient.collection("usuarios",function(err, collection){
      collection.insert(usuario);

      mongoclient.close();
    });
  });
}

//Funcao de logar para acessar o sistema
Usuario.prototype.autenticar = function(usuario,req,res){
  this.connection.open(function(err,mongoclient){
    mongoclient.collection('usuarios',function(err,collection){
      collection.find(usuario).toArray(function(err,result){
        if(result[0] != undefined){

          //Variaveis de Sessao
          req.session.autorizado = true;
          req.session.usuario = result[0].usuario;
          req.session.casa = result[0].casa;
        }

        if(req.session.autorizado){
          res.redirect("jogo");
        }
        else{
          res.render("index",{validacao: {}});
        }
      });

      mongoclient.close();
    });
  });
}



module.exports = function(){
  return Usuario;
}
