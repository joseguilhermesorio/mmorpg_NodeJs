module.exports.jogo = function(application,req,res){
  if(req.session.autorizado !== true){
    res.send('Usuário precisa fazer o login');
    return;
  }

  var msg = '';
  if(req.query.msg !== ''){
    msg = req.query.msg;
  }



  const usuario = req.session.usuario
  const connection = application.config.dbConnection;
  const Jogo = new application.app.models.Jogo(connection);

  Jogo.iniciaJogo(usuario,req,res,msg);
}

module.exports.sair = function(application,req,res){
  req.session.destroy( function(err){
    res.render("index",{validacao: {}});
  });
}

module.exports.suditos = function(application,req,res){
  if(req.session.autorizado !== true){
    res.send("Você não está logado! Faça o logi e tente novamente");
    return;
  }
  res.render("aldeoes",{validacao: {}});
}

module.exports.pergaminhos = function(application,req,res){
  if(req.session.autorizado !== true){
    res.send("Você não está logado! Faça o logi e tente novamente");
    return;
  }

  //Recuperar as acoes inseridas no banco de dados

  const connection = application.config.dbConnection;
  const Jogo = new application.app.models.Jogo(connection);
  var usuario = req.session.usuario;
  Jogo.recuperaAcoes(usuario,res);
}

module.exports.ordenar_acao_sudito = function(application,req,res){
  if(req.session.autorizado !== true){
    res.send("Você não está logado! Faça o logi e tente novamente");
    return;
  }
  const dadosForm = req.body;

  req.assert('acao','Ação deve ser informada').notEmpty();
  req.assert('quantidade','A quantidade deve ser informada').notEmpty();

  const erros = req.validationErrors();

  if(erros){
    res.redirect("jogo?msg=A");
    return;
  }

  const connection = application.config.dbConnection;
  const Jogo = new application.app.models.Jogo(connection);

  dadosForm.usuario = req.session.usuario;

  Jogo.acao(dadosForm);
  res.redirect("jogo?msg=B");

}

module.exports.remover_ordem = function(application,req,res){
  if(req.session.autorizado !== true){
    res.send("Você não está logado! Faça o login e tente novamente!");
  }

  var url_query = req.query;
  const connection = application.config.dbConnection;
  const Jogo = new application.app.models.Jogo(connection);

  var id_acao = url_query.id_acao;
  Jogo.remover_ordem(id_acao,res);
}
