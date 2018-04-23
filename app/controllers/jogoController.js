module.exports.jogo = function(application,req,res){
  if(req.session.autorizado !== true){
    res.send('Usuário precisa fazer o login');
    return;
  }

  var comando_invalido = 'N';
  if(req.query.comando_invalido == 'S'){
    comando_invalido = 'S';
  }



  const usuario = req.session.usuario
  const connection = application.config.dbConnection;
  const Jogo = new application.app.models.Jogo(connection);

  Jogo.iniciaJogo(usuario,req,res,comando_invalido);
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
  res.render("pergaminhos",{validacao: {}});
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
  rres.redirec("jogo?msg=B");

}
