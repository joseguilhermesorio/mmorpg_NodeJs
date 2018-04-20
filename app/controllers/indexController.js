module.exports.index = function(application,req,res){
  res.render('index',{validacao: {}});
}

module.exports.autenticar = function(application,req,res){

  var dadosForm = req.body;

  req.assert('usuario','Usuario não pode ser em branco').notEmpty();
  req.assert('senha','Senha não pode ser em branco').notEmpty();

  var erros = req.validationErrors();

  if(erros){
    res.render('index',{validacao: erros})
    return;
  }

  //Autenticacao
  const connection = application.config.dbConnection;
  const Usuarios = new application.app.models.Usuario(connection);

  Usuarios.autenticar(dadosForm,req,res);

  //res.send('Tudo certo, vamos logar');
}
